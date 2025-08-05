import fastifyMongo from '@fastify/mongodb';
import type { FastifyInstance } from 'fastify';
import { environment } from './environment';

export const setupMongoDB = (app: FastifyInstance): void => {
  app
    .register(fastifyMongo, {
      forceClose: true,
      url: environment.MONGO_URI,
      database: environment.MONGO_DATABASE,
    })
    .ready((err) => {
      if (err) {
        console.error('MongoDB plugin registration failed:', err);
      }
    });

  app.addHook('onRequest', async (req, _) => {
    if (!app.mongo.db) {
      throw new Error('MongoDB instance not found');
    }
    req.mongo = app.mongo.db;
  });
};
