// MIT © 2017 azu
import * as prh from "prh";
import { createSlugFromDictionary, DictionarySerializer, DictionaryTagsSerializer } from "@proofdict/domain";
import * as path from "path";
import * as fs from "fs";
import { yamlFormatter } from "./YamlFormatter";
import { prhRuleToDictionary } from "./PrhRuleToDictionary";

function createPrhEngine(rulePaths: string[], baseDir: string) {
    if (rulePaths.length === 0) {
        return null;
    }
    const prhEngine = prh.fromYAMLFilePath(path.resolve(baseDir, rulePaths[0]));
    rulePaths.slice(1).forEach((ruleFilePath) => {
        const config = prh.fromYAMLFilePath(path.resolve(baseDir, ruleFilePath));
        prhEngine.merge(config);
    });
    return prhEngine;
}

export interface RunOptions {
    cwd: string;
    outputDirectory: string;
    // if you want to add specified tag, set it
    defaultTags?: string[];
}

export async function run(prhFilePathList: string[], options: RunOptions) {
    if (prhFilePathList.length === 0) {
        throw new Error("No specified prh file list.");
    }
    if (options.outputDirectory === undefined) {
        throw new Error("output directory is not defined");
    }
    const outputDir = path.resolve(options.cwd, options.outputDirectory);
    console.log("input:", prhFilePathList.join(", "));
    console.log("output:", outputDir);
    if (!fs.existsSync(outputDir)) {
        console.log("output directory does not exists -> created");
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const prhEngine = createPrhEngine(prhFilePathList, options.cwd);
    if (!prhEngine) {
        throw new Error("prhEngine can not created");
    }
    const jsonPromises = prhEngine.rules.map(prhRuleToDictionary);
    const dictionaries = await Promise.all(jsonPromises);
    dictionaries.forEach((dictionary) => {
        const dictionaryWithTags = options.defaultTags
            ? dictionary.updateTags(DictionaryTagsSerializer.fromJSON(options.defaultTags))
            : dictionary;
        const slug = createSlugFromDictionary(dictionaryWithTags);
        const outputFilePath = path.join(outputDir, slug + ".yml");
        console.log("write: ", outputFilePath);
        fs.writeFileSync(outputFilePath, yamlFormatter(DictionarySerializer.toJSON(dictionaryWithTags)), "utf-8");
    });
}
