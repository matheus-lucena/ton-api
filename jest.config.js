module.exports = {
  setupFiles: ['./.envTest.js'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['./node_modules/'],
  modulePathIgnorePatterns: ['./__tests__/mocks/'],
};
