import { environment } from '@config/environment';
import { Errors } from '@edge-trading/shared/enums/errors';
import { HttpStatusCode } from '@edge-trading/shared/enums/http-status';
import type { User } from '@edge-trading/shared/types/user.types';
import { type AccessTokenPayload, accessTokenSchema } from '@entities/token';
import { MongoCollections } from '@enums/mongo-collections';
import AjvService from '@utils/ajv-service';
import ApiError from '@utils/api-error';
import type { Maybe } from '@utils/common';
import { verifyToken } from '@utils/token';
import type { FastifyReply, FastifyRequest } from 'fastify';

const ajvService = new AjvService();

interface AuthMiddlewareParams {
  refreshToken?: boolean;
  adminOnly?: boolean;
}

/**
 * @function authMiddleware
 * @description Middleware to authenticate requests using JWT tokens
 *
 * @param options - Configuration options for the middleware
 * @returns Fastify preHandler hook function
 */
export const authMiddleware = (options?: AuthMiddlewareParams) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        return reply.error('Authorization header is required', HttpStatusCode.UNAUTHORIZED, Errors.UNAUTHORIZED);
      }

      if (!authHeader.startsWith('Bearer ')) {
        return reply.error(
          'Invalid authorization header format. Expected: Bearer <token>',
          HttpStatusCode.UNAUTHORIZED,
          Errors.UNAUTHORIZED,
        );
      }

      const token = authHeader.replace('Bearer ', '');

      if (!token || token.length === 0) {
        return reply.error('Token is required', HttpStatusCode.UNAUTHORIZED, Errors.UNAUTHORIZED);
      }

      let decoded: Maybe<AccessTokenPayload>;
      try {
        decoded = verifyToken<AccessTokenPayload>(token, environment.JWT_SECRET, options?.refreshToken);
      } catch (error) {
        if (error instanceof Error) {
          return reply.error(error.message, HttpStatusCode.UNAUTHORIZED, Errors.UNAUTHORIZED);
        }
        return reply.error('Internal server error', HttpStatusCode.INTERNAL_SERVER_ERROR, Errors.INTERNAL_SERVER_ERROR);
      }

      if (
        !decoded ||
        (!ajvService.validate<AccessTokenPayload>(accessTokenSchema, decoded) && !options?.refreshToken)
      ) {
        return reply.error('Invalid token', HttpStatusCode.UNAUTHORIZED, Errors.UNAUTHORIZED);
      }

      if (!request.db.collection<User>(MongoCollections.USERS).findOne({ id: decoded.id })) {
        return reply.error('User not found', HttpStatusCode.UNAUTHORIZED, Errors.UNAUTHORIZED);
      }

      request.user = decoded;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      console.error('Auth middleware error:', error);
      return reply.error('Authentication failed', HttpStatusCode.INTERNAL_SERVER_ERROR, Errors.INTERNAL_SERVER_ERROR);
    }
  };
};
