module.exports = {
  testEnvironment: "node",

  projects: [
    {
      displayName: "unit",
      testMatch: ["<rootDir>/tests/unit/**/*.test.js"],
    },
    {
      displayName: "integration",
      testMatch: ["<rootDir>/tests/integration/**/*.test.js"],

      globalSetup: "<rootDir>/tests/setup/globalSetup.js",
      globalTeardown: "<rootDir>/tests/setup/globalTeardown.js",

      setupFilesAfterEnv: ["<rootDir>/tests/setup/setupAfterEnv.js"],
    },
  ],

  testTimeout: 30000,
};
