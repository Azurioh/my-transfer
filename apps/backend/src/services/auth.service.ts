import { Errors } from '@edge-trading/shared/enums/errors';
import { HttpStatusCode } from '@edge-trading/shared/enums/http-status';
import type { SignUpBody } from '@edge-trading/shared/types/auth.types';
import type { User } from '@edge-trading/shared/types/user.types';
import ApiError from '@utils/api-error';
import type { Maybe } from '@utils/common';
import { verifyPassword } from '@utils/password';
import type { WithId } from 'mongodb';
import type { UserRepository } from 'src/repositories/user.repository';

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async signUp(body: SignUpBody): Promise<void> {
    const data: User = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const user = await this.userRepository.createUser(data);

    if (!user.insertedId || !user.acknowledged) {
      throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, Errors.MONGO_CREATION_FAILED, 'Failed to create user');
    }
  }

  async signIn(email: string, password: string): Promise<WithId<User>> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user || !verifyPassword(password, user.password)) {
      throw new ApiError(HttpStatusCode.UNAUTHORIZED, Errors.INVALID_CREDENTIALS, 'Invalid credentials');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<Maybe<WithId<User>>> {
    return this.userRepository.findUserByEmail(email);
  }
}
