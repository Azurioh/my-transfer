import { Errors } from '@enums/errors';
import { HttpStatusCode } from '@enums/http-status';
import { MongoCollections } from '@enums/mongo-collections';
import type { User } from '@schemas/user';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { TBody } from './schema';

export const registerErrors = async (body: TBody, req: FastifyRequest, res: FastifyReply) => {
  const user = await req.mongo.collection<User>(MongoCollections.USERS).findOne({ email: body.email });

  if (user) {
    res.error('User already exists', HttpStatusCode.CONFLICT, Errors.USER_ALREADY_EXISTS);
  }
};
