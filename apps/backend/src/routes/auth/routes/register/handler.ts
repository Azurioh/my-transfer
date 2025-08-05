import { Errors } from '@enums/errors';
import { HttpStatusCode } from '@enums/http-status';
import { MongoCollections } from '@enums/mongo-collections';
import type { User } from '@schemas/user';
import { hashPassword } from '@utils/password';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { registerErrors } from './errors';
import { Body, type TBodyJson, type THeadersJson, type TParamsJson, type TQueryJson } from './schema';

export const registerHandler = async (
  req: FastifyRequest<{ Headers: THeadersJson; Body: TBodyJson; Params: TParamsJson; Query: TQueryJson }>,
  res: FastifyReply,
) => {
  const body = Body.parse(req.body);

  await registerErrors(body, req, res);

  try {
    const hashedPassword = await hashPassword(body.password);

    const user = await req.mongo.collection<User>(MongoCollections.USERS).insertOne({
      ...body,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastRevokedAt: null,
    });

    if (!user.acknowledged) {
      res.error('Failed to register user', HttpStatusCode.INTERNAL_SERVER_ERROR, Errors.INTERNAL_SERVER_ERROR);
    }

    // TODO: Send mail to user

    res.success('User registered successfully', 201);
  } catch (error) {
    console.error('Password hashing error:', error);
    res.error('Failed to register user', HttpStatusCode.INTERNAL_SERVER_ERROR, Errors.INTERNAL_SERVER_ERROR);
  }
};
