export const preset = "ts-jest";
export const testEnvironment = "jsdom";
export const setupFilesAfterEnv = ["<rootDir>/jest.setup.ts"];
export const moduleNameMapper = {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
};
