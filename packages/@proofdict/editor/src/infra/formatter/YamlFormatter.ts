// MIT © 2017 azu
import * as yaml from "js-yaml";
import { DictionaryJSON } from "../../domain/Dictionary/Dictionary";

/**
 * Output as Yaml String
 * @param {DictionaryJSON} json
 * @returns {string}
 */
export const yamlFormatter = (json: DictionaryJSON): string => {
    const noUndefinedJson = JSON.parse(JSON.stringify(json));
    return yaml.safeDump(noUndefinedJson);
};
