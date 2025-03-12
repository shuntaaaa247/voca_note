module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  testMatch: [
    "**/__tests__/**/*.(spec|test).[jt]s?(x)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__tests__/setupTests.ts",
    "/__tests__/__utils__/"
  ],
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
      },
    },
  },
};