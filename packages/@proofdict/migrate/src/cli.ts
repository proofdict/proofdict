import * as fs from "fs";

export const migrations = {
    "noun-to-allows": require("./migrations/noun-to-allows")
};
export const migrationNames = Object.keys(migrations);
export const runMigrate = (filePathList: string[], scriptName: keyof typeof migrations): void => {
    if (!migrationNames.includes(scriptName)) {
        throw new Error(`${scriptName} is not found.`);
    }
    filePathList.forEach(filePath => {
        const content = fs.readFileSync(filePath, "utf-8");
        const migrationScript = migrations[scriptName];
        migrationScript(content, filePath);
    });
};
