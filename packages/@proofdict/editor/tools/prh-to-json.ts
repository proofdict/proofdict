// MIT © 2017 azu
import * as prh from "prh";
import { prhRuleToDictionary } from "../src/infra/prh/PrhRuleToDictionary";
import { createSlugFromDictionary } from "../src/domain/DictionarySlugCreator";
import * as path from "path";
import * as fs from "fs";
import { DictionarySerializer } from "../src/domain/Dictionary";
import { jsonFormatter } from "../src/infra/formatter/JSONFormatter";

/**
 * Usage: node ./prh-to-json.js input.yml /output/dir/
 *
 * Convert prh to json per dictionary.
 */
if (!(process.argv[2] && process.argv[3])) {
    throw new Error("node file.js process-file output-dir");
}
const outputDir = path.resolve(process.cwd(), process.argv[3]);
console.log("Process: " + process.argv[2]);
const result = prh.fromYAMLFilePath(process.argv[2]);
const jsonPromises = result.rules.map(prhRuleToDictionary);
Promise.all(jsonPromises).then(dictionaries => {
    dictionaries.forEach(dictionary => {
        const slug = createSlugFromDictionary(dictionary);
        fs.writeFileSync(path.join(outputDir, slug + ".json"), jsonFormatter(DictionarySerializer.toJSON(dictionary)), "utf-8");
    });
});