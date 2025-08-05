import { HttpStatusCode } from '@enums/http-status';
import { generateAccessToken } from '@routes/auth/utils/generate-tokens';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { getUserFromRefreshToken } from './helper';
import { Body, type TBodyJson, type THeadersJson, type TParamsJson, type TQueryJson } from './schema';

export const refreshTokenHandler = async (
  req: FastifyRequest<{ Headers: THeadersJson; Body: TBodyJson; Params: TParamsJson; Query: TQueryJson }>,
  res: FastifyReply,
) => {
  const body = Body.parse(req.body);

  const user = await getUserFromRefreshToken(body.refreshToken, req.mongo);

  const accessToken = generateAccessToken(user);

  res.success({ accessToken }, HttpStatusCode.OK);
};
