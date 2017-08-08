// MIT © 2017 azu
import { Engine } from "prh";
import { Dictionary } from "../../domain/Dictionary";
import { DictionarySpec } from "../../domain/DictionarySpec";

const isSafeRegExp = require("safe-regex");

export function testPattern(dictionary: Dictionary, spec: DictionarySpec): DictionarySpec {
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
                    expected: dictionary.expected.value,
                    pattern: pattern
                };
            })
        });

        engine.rules.forEach((rule, index) => {
            const source = rule.pattern.source;
            if (!isSafeRegExp(source)) {
                throw new Error(`${patterns[index]} is not safe regexp`);
            }
            if ("(?:)" === source) {
                throw new Error(`${patterns[index]} is not safe regexp`);
            }
        });
        const expected = engine.replaceByRule("/web", spec.actual);
        return spec.updateExpected(expected);
    } catch (error) {
        return spec.invalid(error);
    }
}
