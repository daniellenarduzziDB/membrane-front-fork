module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  coverageReporters: ['text'],
  collectCoverageFrom: ['src/*/.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
};