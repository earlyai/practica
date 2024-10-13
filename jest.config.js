module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/code-generator/*.{ts,tsx}", 
    "!**/test/**"
  ],
  coverageDirectory: "test-reports/coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: ["**/?(*.)+(spec|test|early.test).[tj]s?(x)"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/code-templates/",
    "/basic-app/",
    "/.dist/",
    "/output-folders-for-testing/",
    "/test/",
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
    "jest-watch-suspend",
  ],
};
