const path = require("path");
const MODULE_DIRECTORY = path.resolve(__dirname, "node_modules");

const config = {
    moduleFileExtensions: ["ts", "ts", "js"],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    transformIgnorePatterns: [MODULE_DIRECTORY],
    testRegex: "/__tests__/.*/.*.(test|spec).(ts|ts|js)$",
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.test.json"
        }
    }
}

module.exports = config;