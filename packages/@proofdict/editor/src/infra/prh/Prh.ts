// MIT © 2017 azu
import { Engine } from "prh";
import { Dictionary } from "../../domain/Dictionary";
import { DictionarySpec } from "../../domain/DictionarySpec";

export function testPattern(dictionary: Dictionary, spec: DictionarySpec): DictionarySpec | Error {
    if (spec.actual.length === 0) {
        return spec;
    }
    const patterns = dictionary.patterns.getPatternValuesWithoutEmpty();
    if (patterns.length === 0) {
        return spec;
    }
    try {
        const engine = new Engine({
            version: 1,
            rules: patterns.map(pattern => {
                return {
                    expected: dictionary.expect.value,
                    pattern: pattern
                }
            })
        });
        const expected = engine.replaceByRule("/web", spec.actual);
        return spec.updateExpected(expected);
    } catch (error) {
        return error;
    }
}
