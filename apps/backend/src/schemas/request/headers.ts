import { z } from 'zod';

export const headersField = {
  authorization: z.string().meta({
    description: 'The authorization header to be used to generate a new access token',
    example: 'Bearer 1234567890',
  }),
};

export const headersFields = {
  authorization: { authorization: headersField.authorization },
};

export const headersSchema = z.object({
  ...headersFields.authorization,
});

export type Headers = z.infer<typeof headersSchema>;
