require('dotenv').config({
  path: '.env.test'
});

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['./node_modules/'],
  modulePathIgnorePatterns: ['./__tests__/mocks/'],
};
