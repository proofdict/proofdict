// MIT © 2017 azu
import * as yaml from "js-yaml";
import { DictionaryJSON } from "../../domain/Dictionary";

/**
 * Output as Yaml String
 * @param {DictionaryJSON} json
 * @returns {string}
 */
export const yamlFormatter = (json: DictionaryJSON): string => {
    return yaml.safeDump(json);
};
