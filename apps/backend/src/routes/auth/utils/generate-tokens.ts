import { environment } from '@config/environment';
import { accessTokenSchema, refreshTokenSchema } from '@schemas/token';
import type { User } from '@schemas/user';
import jwt from 'jsonwebtoken';
import type { WithId } from 'mongodb';

/**
 * @description Generates access and refresh tokens for a user
 *
 * @param user - The user to generate tokens for
 * @param rememberMe - Whether to remember the user
 * @returns The access and refresh tokens
 */
export const generateTokens = (
  user: WithId<User>,
  rememberMe: boolean,
): { accessToken: string; refreshToken: string } => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, rememberMe);

  return { accessToken, refreshToken };
};

/**
 * @description Generates an access token from a refresh token
 *
 * @param refreshToken - The refresh token to generate an access token from
 * @returns The access token
 */
export const generateAccessToken = (user: WithId<User>) => {
  const accessTokenPayload = accessTokenSchema.parse({ id: user._id.toString(), name: user.name, email: user.email });
  const accessToken = jwt.sign(accessTokenPayload, environment.JWT_SECRET, { expiresIn: '15m' });

  return accessToken;
};

/**
 * @description Generates a refresh token for a user
 *
 * @param user - The user to generate a refresh token for
 * @param rememberMe - Whether to remember the user
 * @returns The refresh token
 */
export const generateRefreshToken = (user: WithId<User>, rememberMe: boolean) => {
  const refreshTokenPayload = refreshTokenSchema.parse({ id: user._id.toString() });
  const refreshToken = jwt.sign(refreshTokenPayload, environment.JWT_REFRESH_SECRET, {
    expiresIn: rememberMe ? '30d' : '1d',
  });

  return refreshToken;
};
