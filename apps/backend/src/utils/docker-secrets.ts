import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Reads a Docker secret from the default secrets directory
 * @param secretName - The name of the secret file
 * @returns The secret value as a string
 */
export const readDockerSecret = (secretName: string): string => {
  try {
    const secretPath = join('/run/secrets', secretName);
    const secret = readFileSync(secretPath, 'utf8');
    return secret.trim();
  } catch (error) {
    console.error(`Failed to read secret ${secretName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw new Error(`Secret ${secretName} is required but could not be read`);
  }
};

/**
 * Gets a secret value, trying Docker secrets first, then falling back to environment variables
 * This allows for both Docker secrets and local development with environment variables
 * @param secretName - The name of the secret
 * @param envVarName - The environment variable name as fallback
 * @returns The secret value
 */
export const getSecret = (secretName: string, envVarName: string): string => {
  try {
    return readDockerSecret(secretName);
  } catch {
    const envValue = process.env[envVarName];
    if (!envValue) {
      throw new Error(`Neither Docker secret '${secretName}' nor environment variable '${envVarName}' is available`);
    }
    return envValue;
  }
};
