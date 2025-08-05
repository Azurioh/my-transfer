import type { FastifyInstance } from 'fastify';
import Login from './routes/login';
import Register from './routes/register';

export default async (app: FastifyInstance) => {
  await app.register(Login, { prefix: '/v1' });
  await app.register(Register, { prefix: '/v1' });
};
