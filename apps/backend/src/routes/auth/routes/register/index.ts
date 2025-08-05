import type { FastifyInstance } from 'fastify';
import { registerHandler } from './handler';
import { BodyJson, HeadersJson, ParamsJson, QueryJson } from './schema';

const Register = (app: FastifyInstance) =>
  app.route({
    method: 'POST',
    url: '/register',
    schema: {
      tags: ['auth'],
      description: 'Register a new user',
      body: BodyJson,
      headers: HeadersJson,
      params: ParamsJson,
      query: QueryJson,
    },
    handler: registerHandler,
  });

export default Register;
