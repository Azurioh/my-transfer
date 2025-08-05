import { generateTokens } from '@auth-routes/utils/generate-tokens';
import { Errors } from '@enums/errors';
import { HttpStatusCode } from '@enums/http-status';
import { MongoCollections } from '@enums/mongo-collections';
import type { User } from '@schemas/user';
import ApiError from '@utils/api-error';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { loginErrors } from './errors';
import { Body, type TBodyJson, type THeadersJson, type TParamsJson, type TQueryJson } from './schema';

export const loginHandler = async (
  req: FastifyRequest<{ Headers: THeadersJson; Body: TBodyJson; Params: TParamsJson; Query: TQueryJson }>,
  res: FastifyReply,
) => {
  const body = Body.parse(req.body);

  const user = await req.mongo.collection<User>(MongoCollections.USERS).findOne({ email: body.email });

  if (!user) {
    throw new ApiError(HttpStatusCode.UNAUTHORIZED, Errors.INVALID_CREDENTIALS, 'Invalid credentials');
  }

  await loginErrors(user, body.password, res);

  const { accessToken, refreshToken } = generateTokens(user, body.rememberMe);

  res.success({
    accessToken,
    refreshToken,
  });
};
