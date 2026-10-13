import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.spec.ts'],
    testTimeout: 15000,
    hookTimeout: 15000,
    maxWorkers: 1,
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './reports/junit.xml'
    }
  }
});
