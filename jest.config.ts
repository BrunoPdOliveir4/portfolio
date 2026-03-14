import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json',
    }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.ts',
    '^framer-motion$': '<rootDir>/src/__mocks__/framer-motion.tsx',
    '^next-intl$': '<rootDir>/src/__mocks__/next-intl.tsx',
  },
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setup.ts'],
};

export default config;
