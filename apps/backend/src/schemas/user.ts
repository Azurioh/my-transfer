import { z } from 'zod';

export const userField = {
  name: z.string().meta({
    description: 'The name of the user',
    example: 'John Doe',
  }),
  email: z.email().meta({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  }),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .meta({
      description: 'The password of the user',
      example: 'Password123!',
    }),
  lastRevokedAt: z.union([z.date(), z.iso.datetime()]).nullable().meta({
    description: 'The date and time the user was last revoked',
    example: '2021-01-01T00:00:00.000Z',
  }),
  updatedAt: z.union([z.date(), z.iso.datetime()]).meta({
    description: 'The date and time the user was updated',
    example: '2021-01-01T00:00:00.000Z',
  }),
  createdAt: z.union([z.date(), z.iso.datetime()]).meta({
    description: 'The date and time the user was created',
    example: '2021-01-01T00:00:00.000Z',
  }),
};

export const userFields = {
  name: { name: userField.name },
  email: { email: userField.email },
  password: { password: userField.password },
  lastRevokedAt: { lastRevokedAt: userField.lastRevokedAt },
  updatedAt: { updatedAt: userField.updatedAt },
  createdAt: { createdAt: userField.createdAt },
};

export const userSchema = z.object({
  ...userFields.name,
  ...userFields.email,
  ...userFields.password,
  ...userFields.lastRevokedAt,
  ...userFields.updatedAt,
  ...userFields.createdAt,
});

export type User = z.infer<typeof userSchema>;
