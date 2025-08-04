import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const REQUIRED_ENV_VARS = {
  VITE_API_URL: process.env.VITE_API_URL,
};

const validateEnv = () => {
  const missing = Object.entries(REQUIRED_ENV_VARS)
    .filter(([key]) => !process.env[key])
    .map(([key, description]) => `${key} (${description})`);

  if (missing.length > 0) {
    throw new Error(`The environment variable "${missing}" is missing.`);
  }
};

const getRootDir = () => {
  const currentDir = dirname(fileURLToPath(import.meta.url));

  return resolve(currentDir, '../../');
};

export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, getRootDir(), '') };

  validateEnv();

  return {
    define: {
      'process.env': process.env,
    },
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      checker(command === 'build' ? { typescript: true, vueTsc: true } : null),
    ].filter(Boolean),
    build: { outDir: 'build' },
    server: { open: true },
    cacheDir: `node_modules/.vite_cache_${process.pid}`,
  };
});
