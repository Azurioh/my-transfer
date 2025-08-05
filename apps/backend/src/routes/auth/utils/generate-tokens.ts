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
  const accessTokenPayload = accessTokenSchema.parse({ id: user._id.toString(), name: user.name, email: user.email });
  const refreshTokenPayload = refreshTokenSchema.parse({ id: user._id.toString() });

  const jwtSecret = environment.JWT_SECRET;
  const jwtRefreshSecret = environment.JWT_REFRESH_SECRET;

  const accessToken = jwt.sign(accessTokenPayload, jwtSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign(refreshTokenPayload, jwtRefreshSecret, {
    expiresIn: rememberMe ? '30d' : '1d',
  });

  return { accessToken, refreshToken };
};
