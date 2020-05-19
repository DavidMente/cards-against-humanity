module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns : [
    "<rootDir>/node_modules",
    "<rootDir>/src/client",
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!**/node_modules/**",
    "!**/client/**",
    "!**/logger.ts",
    "!src/index.ts",
    "!**/__mocks__/**"
  ],
};
