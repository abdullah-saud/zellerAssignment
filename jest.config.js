module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "js"],
    modulePathIgnorePatterns: ["<rootDir>/dist/"], // Ignore compiled files
  };
  