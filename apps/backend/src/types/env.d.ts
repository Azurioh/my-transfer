declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    API_BASE_URL: string;
    PORT: string;
    MONGO_URI: string;
    MONGO_DATABASE: string;
    PASSWORD_SECRET: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
  }
}
