import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";

export const runSnapshot = (rootDirectory: string, handler: (content: string, filePath: string) => string) => {
    fs.readdirSync(rootDirectory).map((caseName) => {
        const normalizedTestName = caseName.replace(/-/g, " ");
        it(`Test ${normalizedTestName}`, async () => {
            const fixtureDir = path.join(rootDirectory, caseName);
            const actualFilePath = path.join(fixtureDir, "input.yaml");
            const actualContent = fs.readFileSync(actualFilePath, "utf-8");
            const actualResult = handler(actualContent, actualFilePath);
            const expectedFilePath = path.join(fixtureDir, "output.yaml");
            const existExpectedFile = fs.existsSync(expectedFilePath);
            // UPDATE_SNAPSHOT=1 npm test
            // Update snapshot
            if (process.env.UPDATE_SNAPSHOT || !existExpectedFile) {
                fs.writeFileSync(expectedFilePath, actualResult);
                return;
            }
            // Input === Output
            const expectedResult = fs.readFileSync(expectedFilePath, "utf-8");
            assert.deepStrictEqual(
                actualResult,
                expectedResult,
                `
${fixtureDir}
${actualResult}
`
            );
        });
    });
};
