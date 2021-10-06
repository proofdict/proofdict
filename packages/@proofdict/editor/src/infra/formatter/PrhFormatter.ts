// MIT © 2017 azu
import * as yaml from "js-yaml";
import { DictionaryJSON } from "@proofdict/domain";

export const modifyForPrh = (json: DictionaryJSON): Object => {
    const description = json.description
        ? {
              prh: json.description
          }
        : {};
    return {
        ...description,
        expected: json.expected,
        patterns: json.patterns,
        specs: json.specs.map((spec) => {
            return {
                from: spec.from,
                to: spec.to
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
