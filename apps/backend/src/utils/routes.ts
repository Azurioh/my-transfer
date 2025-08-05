import type { FastifyInstance, FastifyPluginCallback } from 'fastify';

/**
 * @description Register routes with a prefix
 *
 * @param app - The Fastify instance
 * @param routes - The routes to register
 * @param prefix - The prefix to register the routes with
 */
export const registerRoutesWithPrefix = (app: FastifyInstance, routes: FastifyPluginCallback[], prefix: string) => {
  for (const route of routes) {
    app.register(route, { prefix });
  }
};
