// MIT © 2017 azu
import { DictionaryJSON } from "../../domain/Dictionary";

/**
 * Output as JSON String
 * @param {DictionaryJSON} json
 * @returns {string}
 */
export const jsonFormatter = (json: DictionaryJSON): string => {
    return JSON.stringify(json, null, 4);
};
