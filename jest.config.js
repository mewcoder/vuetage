module.exports = {
  rootDir: process.cwd(),
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '.*\\.(ts|js)$': ['@swc/jest']
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
