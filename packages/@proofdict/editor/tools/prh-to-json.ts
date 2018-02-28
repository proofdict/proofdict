// MIT © 2017 azu
import * as prh from "prh";
import { prhRuleToDictionary } from "../src/infra/prh/PrhRuleToDictionary";
import { createSlugFromDictionary } from "../src/domain/Dictionary/DictionarySlugCreator";
import * as path from "path";
import * as fs from "fs";
import { DictionarySerializer } from "../src/domain/Dictionary/Dictionary";
import { yamlFormatter } from "../src/infra/formatter/YamlFormatter";
import { DictionaryTagsSerializer } from "../src/domain/Dictionary/DictionaryTags";

/**
 * Usage: node ./prh-to-json.js input.yml /output/dir/
 *
 * Convert prh to json per dictionary.
 */
if (!(process.argv[2] && process.argv[3])) {
    throw new Error("node file.js process-file output-dir");
}
const tags = process.argv[4] !== undefined ? process.argv[4].split(",") : [];
const outputDir = path.resolve(process.cwd(), process.argv[3]);
console.log("Process: " + process.argv[2]);
const result = prh.fromYAMLFilePath(process.argv[2]);
const jsonPromises = result.rules.map(prhRuleToDictionary);
Promise.all(jsonPromises).then(dictionaries => {
    dictionaries.forEach(dictionary => {
        const dictionaryWithTags = dictionary.updateTags(DictionaryTagsSerializer.fromJSON(tags));
        const slug = createSlugFromDictionary(dictionaryWithTags);
        fs.writeFileSync(path.join(outputDir, slug + ".yml"), yamlFormatter(DictionarySerializer.toJSON(dictionaryWithTags)), "utf-8");
    });
}).catch(error => {
    console.error(error);
});
