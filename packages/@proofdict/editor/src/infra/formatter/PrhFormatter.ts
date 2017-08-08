// MIT © 2017 azu
import * as yaml from "js-yaml";
import { DictionaryJSON } from "../../domain/Dictionary";

export const modifyForPrh = (json: DictionaryJSON): Object => {
    return {
        expected: json.expected,
        patterns: json.patterns,
        specs: json.specs.map(spec => {
            return {
                from: spec.actual,
                to: spec.expected
            };
        })
    };
};
/**
 * Output as Prh String
 * @param {DictionaryJSON} json
 * @returns {string}
 */
export const prhFormatter = (json: DictionaryJSON): string => {
    return yaml.safeDump(modifyForPrh(json));
};
