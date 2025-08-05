import type {} from 'fastify';
import type { z } from 'zod';

/**
 * @type Maybe
 *
 * @description A type that represents a value that can be null or undefined.
 */
export type Maybe<T> = T | null | undefined;

/**
 * @description Excludes properties from an object.
 *
 * @param obj - The object to exclude properties from.
 * @param properties - The properties to exclude.
 *
 * @returns The object with the properties excluded.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const properties = ['b', 'c'];
 * const newObj = excludeProperties(obj, properties);
 * // newObj = { a: 1 }
 */
export const excludeProperties = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  properties: K[],
): Omit<T, K> => {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !properties.includes(key as K))) as Omit<T, K>;
};

/**
 * @description Excludes properties from an object recursively.
 *
 * @param obj - The object to exclude properties from.
 * @param properties - The properties to exclude.
 *
 * @returns The object with the properties excluded.
 */
export const excludePropertiesRecursively = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  properties: K[],
): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key]) => !properties.includes(key as K))
      .map(([key, value]) => [
        key,
        typeof value === 'object' && value !== null
          ? excludePropertiesRecursively(value as Record<string, unknown>, properties as string[])
          : value,
      ]),
  ) as Omit<T, K>;
};

/**
 * @description Converts a zod JSON schema to an AJV schema.
 *
 * @param schema - The zod JSON schema to convert.
 *
 * @returns The AJV schema.
 */
export const zodJsonSchemaToAjvSchema = (schema: z.core.JSONSchema.JSONSchema) => ({
  ...excludeProperties(schema, ['$schema']),
  ...(schema.properties
    ? { properties: excludePropertiesRecursively(schema.properties, ['example']) }
    : { properties: {} }),
  required: Object.entries(schema.required ?? {}).map(([_, value]) => value),
});
