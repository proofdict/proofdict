// MIT © 2017 azu
import { ProofdictRule, Proofdict } from "./proofdict-tester";

const NOUN_TAG = "noun";

/**
 * Does the `dict` has "noun" tag?
 * @param {ProofdictRule} dict
 * @returns {boolean}
 */
export function isNoun(dict: ProofdictRule): boolean {
    return dict.tags.indexOf(NOUN_TAG) !== -1;
}

export function filterByTags(dictionary: Proofdict, allowTags: string[] = [], denyTags: string[] = []) {
    if (allowTags.length > 0) {
        return dictionary.filter(item => {
            return allowTags.every(allowTag => item.tags.indexOf(allowTag) !== -1);
        });
    }
    if (denyTags.length > 0) {
        return dictionary.filter(item => {
            return !item.tags.some(tag => denyTags.indexOf(tag) !== -1);
        });
    }
    return dictionary;
}
