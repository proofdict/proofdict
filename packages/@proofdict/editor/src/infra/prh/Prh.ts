// MIT © 2017 azu
import { Engine } from "prh";
import { Dictionary } from "../../domain/Dictionary";

export function testPattern(dictionary: Dictionary, testInput: string) {
    const expected = (dictionary.expect && dictionary.expect.value) || "";
    const engine = new Engine({
        version: 1.0,
        rules: [
            {
                expected: expected,
                patterns: dictionary.patterns.getPatternValues()
            }
        ]
    });
    const diff = engine.makeChangeSet("/web", testInput);
    console.log(diff);
}
