import { getSecret } from '@utils/docker-secrets';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @interface Environment
 * @description This interface defines the structure of the environment variables used in the application.
 */
export interface Environment {
  NODE_ENV: string;
  PORT: number;
  API_BASE_URL: string;
  MONGO_URI: string;
  MONGO_DATABASE: string;
  PASSWORD_SECRET: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_RESET_PASSWORD_SECRET: string;
}

const variables: { [key: string]: string | undefined } = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: process.env.API_BASE_URL,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
};

for (const [key, value] of Object.entries(variables)) {
  if (value === undefined) {
    console.error(`\r\x1b[31mError:\x1b[0m Variable ${key} is not defined`);
    process.exit(1);
  }
  if (value === '') {
    console.error(`\r\x1b[31mError:\x1b[0m Variable ${key} is empty`);
    process.exit(1);
  }
}

const port = Number(variables.PORT);

if (Number.isNaN(port)) {
  console.error('\r\x1b[31mError:\x1b[0m Variable PORT is not a number');
  process.exit(1);
}

const secrets = ['password_secret', 'jwt_secret', 'jwt_refresh_secret', 'jwt_reset_password_secret'];
for (const secret of secrets) {
  try {
    const value = getSecret(secret, secret.toUpperCase());
    if (!value || value.trim() === '') {
      console.error(`\r\x1b[31mError:\x1b[0m Secret ${secret} is empty or undefined`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`\r\x1b[31mError:\x1b[0m Failed to retrieve secret ${secret}:`, error);
    process.exit(1);
  }
}

export const environment: Environment = {
  PORT: port,
  NODE_ENV: process.env.NODE_ENV as string,
  API_BASE_URL: process.env.API_BASE_URL as string,
  MONGO_URI: process.env.MONGO_URI as string,
  MONGO_DATABASE: process.env.MONGO_DATABASE as string,
  PASSWORD_SECRET: getSecret('password_secret', 'PASSWORD_SECRET'),
  JWT_SECRET: getSecret('jwt_secret', 'JWT_SECRET'),
  JWT_REFRESH_SECRET: getSecret('jwt_refresh_secret', 'JWT_REFRESH_SECRET'),
  JWT_RESET_PASSWORD_SECRET: getSecret('jwt_reset_password_secret', 'JWT_RESET_PASSWORD_SECRET'),
};
