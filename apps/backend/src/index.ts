/// <reference path="./types/fastify.d.ts" />
import { environment } from '@config/environment';
import build from '@core/app';

/**
 * @function start
 *
 * @description Starts the server.
 */
async function start(): Promise<void> {
  const app = await build();

  await app.listen({ port: environment.PORT, host: '0.0.0.0' });
}

start();
