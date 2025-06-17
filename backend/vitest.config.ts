import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // pour éviter d'importer describe, it à chaque fois
    environment: 'node',
  },
});
