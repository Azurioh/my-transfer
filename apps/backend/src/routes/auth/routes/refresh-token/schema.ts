import { headersFields } from '@schemas/request/headers';
import { zodJsonSchemaToAjvSchema } from '@utils/common';
import { z } from 'zod';

/**
 * Body schema
 */

export const Body = z.object({
  refreshToken: z.string().meta({
    description: 'The refresh token to be used to generate a new access token',
    example: '1234567890',
  }),
});

export const BodyJson = zodJsonSchemaToAjvSchema(z.toJSONSchema(Body));

export type TBody = z.infer<typeof Body>;

export type TBodyJson = typeof BodyJson;

/**
 * Header schema
 */

export const Headers = z.looseObject({
  ...headersFields.authorization,
});

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
