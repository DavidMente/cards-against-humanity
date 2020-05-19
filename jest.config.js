module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!**/node_modules/**",
    "!**/client/**",
    "!**/logger.ts",
    "!src/index.ts",
    "!**/__mocks__/**"
  ],
};
