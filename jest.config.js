module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',  // For mocking CSS imports
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  };
  