import { z } from 'zod';
import { userField } from './user';

export const accessTokenField = {
  id: z.string().meta({
    description: 'The unique identifier of the token',
    example: '507f1f77bcf86cd799439011',
  }),
  name: userField.name,
  email: userField.email,
};

export const accessTokenFields = {
  id: { id: accessTokenField.id },
  name: { name: accessTokenField.name },
  email: { email: accessTokenField.email },
};

export const accessTokenSchema = z.object({
  ...accessTokenFields.id,
  ...accessTokenFields.name,
  ...accessTokenFields.email,
});

export type Token = z.infer<typeof accessTokenSchema>;

export const refreshTokenField = {
  id: accessTokenField.id,
};

export const refreshTokenFields = {
  id: { id: refreshTokenField.id },
};

export const refreshTokenSchema = z.object({
  ...refreshTokenField.id,
});

export type RefreshToken = z.infer<typeof refreshTokenSchema>;
