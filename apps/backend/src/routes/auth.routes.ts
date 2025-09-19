import { contentTypeHeaderSchema } from '@edge-trading/shared/types/common.types';
import { loginBodySchema, registerBodySchema } from '@schemas/auth.schemas';
import type { FastifyInstance } from 'fastify';
import { AuthController } from 'src/controllers/auth.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthService } from 'src/services/auth.service';

export default async (app: FastifyInstance) => {
  if (!app.mongo.db) {
    throw new Error('MongoDB database is not connected');
  }
  const userRepository = new UserRepository(app.mongo.db);
  const authService = new AuthService(userRepository);
  const authController = new AuthController(authService);

  app.route({
    method: 'POST',
    url: '/v1/register',
    schema: { body: registerBodySchema, headers: contentTypeHeaderSchema },
    handler: authController.signUp.bind(authController),
  });
  app.route({
    method: 'POST',
    url: '/v1/login',
    schema: { body: loginBodySchema, headers: contentTypeHeaderSchema },
    handler: authController.signIn.bind(authController),
  });
};
