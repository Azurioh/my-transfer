import type { FastifyInstance } from 'fastify';
import { authMiddleware } from 'src/middlewares/auth-middleware';
import { refreshTokenHandler } from './handler';
import { BodyJson, HeadersJson, ParamsJson, QueryJson } from './schema';

const RefreshToken = (app: FastifyInstance) =>
  app.route({
    method: 'POST',
    url: '/refresh-token',
    schema: {
      tags: ['auth'],
      description: 'Refresh a token',
      body: BodyJson,
      headers: HeadersJson,
      params: ParamsJson,
      query: QueryJson,
    },
    preHandler: [authMiddleware()],
    handler: refreshTokenHandler,
  });

export default RefreshToken;
