import { Errors } from '@enums/errors';
import { HttpStatusCode } from '@enums/http-status';
import type { User } from '@schemas/user';
import type { Maybe } from '@utils/common';
import { verifyPassword } from '@utils/password';
import type { FastifyReply } from 'fastify';

export const loginErrors = async (user: Maybe<User>, password: string, res: FastifyReply) => {
  if (!user || !verifyPassword(password, user.password)) {
    res.error('Invalid credentials', HttpStatusCode.UNAUTHORIZED, Errors.INVALID_CREDENTIALS as Errors);
  }
};
