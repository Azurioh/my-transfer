import { Versioning } from '@enums/versioning';
import { registerRoutesWithPrefix } from '@utils/routes';
import type { FastifyInstance } from 'fastify';
import Login from './routes/login';
import RefreshToken from './routes/refresh-token';
import Register from './routes/register';

export default async (app: FastifyInstance) => {
  const routesV1 = [Login, Register, RefreshToken];

  registerRoutesWithPrefix(app, routesV1, Versioning.V1);
};
