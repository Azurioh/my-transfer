import { environment } from '@config/environment';
import { Errors } from '@enums/errors';
import { HttpStatusCode } from '@enums/http-status';
import { MongoCollections } from '@enums/mongo-collections';
import type { Token } from '@schemas/token';
import type { User } from '@schemas/user';
import ApiError from '@utils/api-error';
import jwt from 'jsonwebtoken';
import { type Db, ObjectId, type WithId } from 'mongodb';

/**
 * @description Get user from refresh token
 *
 * @param refreshToken - The refresh token
 * @param mongo - The MongoDB database
 * @returns The user
 */
export const getUserFromRefreshToken = async (refreshToken: string, mongo: Db): Promise<WithId<User>> => {
  try {
    const decoded = jwt.verify(refreshToken, environment.JWT_REFRESH_SECRET) as Token;
    const user = await mongo.collection<User>(MongoCollections.USERS).findOne({ _id: new ObjectId(decoded.id) });

    if (!user) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, Errors.RESOURCE_NOT_FOUND, 'User not found');
    }

    return user;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(HttpStatusCode.UNAUTHORIZED, Errors.INVALID_REFRESH_TOKEN, 'Invalid refresh token');
  }
};
