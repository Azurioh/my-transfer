import type { FastifyInstance } from 'fastify';
import { loginHandler } from './handler';
import { BodyJson, HeadersJson, ParamsJson, QueryJson } from './schema';

const Login = (app: FastifyInstance) =>
  app.route({
    method: 'POST',
    url: '/login',
    schema: {
      tags: ['auth'],
      description: 'Login to the system',
      body: BodyJson,
      headers: HeadersJson,
      params: ParamsJson,
      query: QueryJson,
    },
    handler: loginHandler,
  });

export default Login;
