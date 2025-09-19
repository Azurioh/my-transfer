import type { JSONSchemaType } from 'ajv';

/**
 * @type ContentType
 *
 * @description Content-Type request headers
 */
export type ContentType = {
  'content-type': 'application/json';
};

/**
 * @constant contentTypeHeaderSchema
 *
 * @description JSON Schema for Content-Type request headers validation
 */
export const contentTypeHeaderSchema: JSONSchemaType<ContentType> = {
  type: 'object',
  properties: {
    'content-type': { type: 'string', enum: ['application/json'] },
  },
  required: ['content-type'],
};
