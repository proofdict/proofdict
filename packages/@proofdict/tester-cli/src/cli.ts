import * as path from "path";
import { assertJSON, assertYAML } from "./assert";
import globby = require("globby");

export const execute = (globPattern: string[]) => {
    const fileList = globby.sync(globPattern);
    const promises = fileList.map(filePath => {
        const ext = path.extname(filePath);
        if (ext === ".yml" || ext === ".yaml") {
            return assertYAML(filePath);
        } else if (ext === ".json") {
            return assertJSON(filePath);
        }
        throw new Error(`This file is not supported: ${filePath}`);
    });
    return Promise.all(promises).then(() => {
        return `Pass ${fileList.length} files!`;
    });
};
