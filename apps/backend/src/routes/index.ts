import type { FastifyInstance } from 'fastify';
import authRoute from './auth';
import healthRoute from './health';

export async function router(app: FastifyInstance): Promise<void> {
  app.register(healthRoute, { prefix: '/health' });
  app.register(authRoute, { prefix: '/auth' });
}
