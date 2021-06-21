module.exports = {
  preset: 'ts-jest',
  testMatch: [
    '**/__tests__/**/*.(ts|js)',
    '**/?(*.)+(spec|test).(ts|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/src/jest-setup.ts'
  ],
};
