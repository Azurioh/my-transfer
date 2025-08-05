import { Errors } from '@enums/errors';
import { HttpStatusCode } from '@enums/http-status';
import type { User } from '@schemas/user';
import type { Maybe } from '@utils/common';
import { verifyPassword } from '@utils/password';
import type { FastifyReply } from 'fastify';
import type { WithId } from 'mongodb';

export const loginErrors = async (user: Maybe<WithId<User>>, password: string, res: FastifyReply) => {
  if (!user || !(await verifyPassword(password, user.password))) {
    res.error('Invalid credentials', HttpStatusCode.UNAUTHORIZED, Errors.INVALID_CREDENTIALS as Errors);
  }
};
