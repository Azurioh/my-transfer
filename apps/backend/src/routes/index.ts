import type { FastifyInstance } from 'fastify';
import authRoutes from './auth.routes';

export async function router(app: FastifyInstance): Promise<void> {
  app.register(authRoutes, { prefix: '/auth' });
}
