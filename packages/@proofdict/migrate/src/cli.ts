import * as fs from "fs";
import * as nounToAllows from "./migrations/noun-to-allows";

export const migrations = {
    "noun-to-allows": nounToAllows.migrate
};
export const migrationNames = Object.keys(migrations);
export const runMigrate = (filePathList: string[], scriptName: keyof typeof migrations): void => {
    if (!migrationNames.includes(scriptName)) {
        throw new Error(`${scriptName} is not found.`);
    }
    filePathList.forEach(filePath => {
        const content = fs.readFileSync(filePath, "utf-8");
        const migrationScript = migrations[scriptName];
        console.log(`- Start: ${filePath}`);
        const output = migrationScript(content, filePath);
        if (content !== output) {
            fs.writeFileSync(filePath, output, "utf-8");
            console.log(`- Update: ${filePath}`);
        }
        console.log(`- Finish: ${filePath}`);
    });
};
