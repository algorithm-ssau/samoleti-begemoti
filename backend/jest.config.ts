// jest.config.ts
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    // automock: true,
    testMatch: ["**/?(*.)+(spec|test).[j]s?(x)"],
};
export default config;
