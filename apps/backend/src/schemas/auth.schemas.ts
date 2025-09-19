import type { SignInBody, SignUpBody } from '@edge-trading/shared/types/auth.types';
import type { ContentType } from '@edge-trading/shared/types/common.types';
import type { JSONSchemaType } from 'ajv';

/**
 * @constant registerBodySchema
 *
 * @description JSON Schema for SignUp request body validation
 */
export const registerBodySchema: JSONSchemaType<SignUpBody> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 1,
      maxLength: 255,
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 128,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]',
    },
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^[a-zA-Z\\s]+$',
    },
  },
  required: ['email', 'password', 'name'],
  additionalProperties: false,
};

/**
 * @constant registerHeadersSchema
 *
 * @description JSON Schema for SignUp request headers validation
 */
export const registerHeadersSchema: JSONSchemaType<ContentType> = {
  type: 'object',
  properties: {
    'content-type': { type: 'string', enum: ['application/json'] },
  },
  required: ['content-type'],
};

/**
 * @constant loginBodySchema
 *
 * @description JSON Schema for Login request body validation
 */
export const loginBodySchema: JSONSchemaType<SignInBody> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 1,
      maxLength: 255,
    },
    password: {
      type: 'string',
      minLength: 1,
      maxLength: 128,
    },
    rememberMe: {
      type: 'boolean',
    },
  },
  required: ['email', 'password', 'rememberMe'],
  additionalProperties: false,
};

/**
 * @constant loginResponseSchema
 *
 * @description JSON Schema for successful signup response
 */
export const loginResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    message: { type: 'string' },
    data: { type: 'null' },
  },
  required: ['success', 'message', 'data'],
};

/**
 * @constant signInResponseSchema
 *
 * @description JSON Schema for successful login response
 */
export const signInResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    message: { type: 'string' },
    data: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
      required: ['accessToken', 'refreshToken'],
    },
  },
  required: ['success', 'message', 'data'],
};
