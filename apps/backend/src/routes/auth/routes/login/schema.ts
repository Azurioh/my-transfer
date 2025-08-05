import { userField } from '@schemas/user';
import { zodJsonSchemaToAjvSchema } from '@utils/common';
import z from 'zod';

/**
 * Body schema
 */

export const Body = z.object({
  email: userField.email,
  password: userField.password,
  rememberMe: z.boolean().meta({
    description: 'Whether to remember the user',
    example: true,
  }),
});

export const BodyJson = zodJsonSchemaToAjvSchema(z.toJSONSchema(Body));

export type TBody = z.infer<typeof Body>;

export type TBodyJson = typeof BodyJson;

/**
 * Header schema
 */

export const Headers = z.looseObject({});

export const HeadersJson = zodJsonSchemaToAjvSchema(z.toJSONSchema(Headers));

export type THeaders = z.infer<typeof Headers>;

export type THeadersJson = typeof HeadersJson;

/**
 * Params schema
 */

export const Params = z.looseObject({});

export const ParamsJson = zodJsonSchemaToAjvSchema(z.toJSONSchema(Params));

export type TParams = z.infer<typeof Params>;

export type TParamsJson = typeof ParamsJson;

/**
 * Query schema
 */

export const Query = z.looseObject({});

export const QueryJson = zodJsonSchemaToAjvSchema(z.toJSONSchema(Query));

export type TQuery = z.infer<typeof Query>;

export type TQueryJson = typeof QueryJson;
