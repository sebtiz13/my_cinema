import type { JestConfigWithTsJest } from 'ts-jest';

// Sync object
const config: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['**/*.(t|j)s'],
  preset: 'ts-jest',
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
// eslint-disable-next-line import/no-default-export -- Jest config need default export
export default config;
