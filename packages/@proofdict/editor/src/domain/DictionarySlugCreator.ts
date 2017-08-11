// MIT © 2017 azu
import { Dictionary } from "./Dictionary";

const sanitizeFileName = require("sanitize-filename");

/**
 * Create fileName-safe slug string from dictionary
 * @param {Dictionary} dictionary
 * @returns {string}
 */
export function createSlugFromDictionary(dictionary: Dictionary): string {
    if (dictionary.wordClasses.hasWordClass) {
        const wordClassNames = dictionary.wordClasses
            .toList()
            .map(wordClass => {
                return wordClass.pos;
            })
            .join("-");
        return sanitizeFileName(`${dictionary.expected.value}--${wordClassNames}`).replace(/\s/g, "_");
    }
    return sanitizeFileName(dictionary.expected.value).replace(/\s/g, "_");
}
