import { environment } from '@config/environment';
import { Errors } from '@enums/errors';
import { HttpStatusCode } from '@enums/http-status';
import { accessTokenSchema } from '@schemas/token';
import type { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

/**
 * @function authMiddleware
 * @description Middleware to authenticate requests using JWT tokens
 *
 * @param options - Configuration options for the middleware
 * @returns Fastify preHandler hook function
 */
export const authMiddleware = () => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        return reply.error('Authorization header is required', HttpStatusCode.UNAUTHORIZED, Errors.UNAUTHORIZED, {
          missing: 'authorization_header',
        });
      }

      if (!authHeader.startsWith('Bearer ')) {
        return reply.error(
          'Invalid authorization header format. Expected: Bearer <token>',
          HttpStatusCode.UNAUTHORIZED,
          Errors.UNAUTHORIZED,
          { invalid_format: 'authorization_header' },
        );
      }

      const token = authHeader.replace('Bearer ', '');

      if (!token || token.length === 0) {
        return reply.error('Token is required', HttpStatusCode.UNAUTHORIZED, Errors.UNAUTHORIZED, { missing: 'token' });
      }

      let decoded: jwt.JwtPayload;
      try {
        decoded = jwt.verify(token, environment.JWT_SECRET) as jwt.JwtPayload;
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          return reply.error('Token has expired', HttpStatusCode.UNAUTHORIZED, Errors.UNAUTHORIZED, {
            expired: 'token',
          });
        }
        if (error instanceof jwt.JsonWebTokenError) {
          return reply.error('Invalid token', HttpStatusCode.UNAUTHORIZED, Errors.UNAUTHORIZED, { invalid: 'token' });
        }
        return reply.error('Token verification failed', HttpStatusCode.UNAUTHORIZED, Errors.UNAUTHORIZED, {
          verification_failed: 'token',
        });
      }

      const payload = accessTokenSchema.safeParse(decoded);
      if (!payload.success) {
        return reply.error('Invalid token payload', HttpStatusCode.UNAUTHORIZED, Errors.UNAUTHORIZED, {
          invalid_payload: 'token',
        });
      }

      request.user = payload.data;
    } catch (error) {
      console.error('Auth middleware error:', error);
      return reply.error('Authentication failed', HttpStatusCode.INTERNAL_SERVER_ERROR, Errors.INTERNAL_SERVER_ERROR);
    }
  };
};
