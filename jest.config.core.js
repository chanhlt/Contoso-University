/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['html', 'text-summary'],
  collectCoverageFrom: ['src/core/**/*.ts'],
  testMatch: ['**/tests/core/**/*.test.ts']
};
