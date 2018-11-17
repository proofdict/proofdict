// MIT © 2017 azu
import { Dictionary } from "./Dictionary";

const sanitizeFileName = require("sanitize-filename");

const escapeName = (fileName: string) => {
    return fileName.replace(/\s/g, "_").replace(/^\./, "_");
};

/**
 * Create fileName-safe slug string from dictionary
 * @param {Dictionary} dictionary
 * @returns {string}
 */
export function createSlugFromDictionary(dictionary: Dictionary): string {
    return sanitizeFileName(escapeName(dictionary.expected.value));
}
