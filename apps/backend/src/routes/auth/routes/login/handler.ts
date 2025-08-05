import { generateTokens } from '@auth-routes/utils/generate-tokens';
import { MongoCollections } from '@enums/mongo-collections';
import type { User } from '@schemas/user';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { WithId } from 'mongodb';
import { loginErrors } from './errors';
import { Body, type TBodyJson, type THeadersJson, type TParamsJson, type TQueryJson } from './schema';

export const loginHandler = async (
  req: FastifyRequest<{ Headers: THeadersJson; Body: TBodyJson; Params: TParamsJson; Query: TQueryJson }>,
  res: FastifyReply,
) => {
  const body = Body.parse(req.body);

  const user = await req.mongo.collection<User>(MongoCollections.USERS).findOne({ email: body.email });

  await loginErrors(user, body.password, res);

  const { accessToken, refreshToken } = generateTokens(user as WithId<User>, body.rememberMe);

  res.success({
    accessToken,
    refreshToken,
  });
};
