import { Dictionary, DictionaryIdentifier, DictionaryJSON } from "./Dictionary";
import { DictionaryExpected } from "./DictionaryExpected";
import { DictionaryPatterns } from "./DictionaryPatterns";
import { DictionarySpecs } from "./DictionarySpecs";
import { DictionaryPattern } from "./DictionaryPattern";
import { DictionarySpec } from "./DictionarySpec";

const ulid = require("ulid");

export const createDictionary = (json?: DictionaryJSON) => {
    if (json) {
        return new Dictionary({
            id: new DictionaryIdentifier(json.id),
            expected: new DictionaryExpected(json.expected),
            patterns: new DictionaryPatterns(
                json.patterns.map(pattern => {
                    return new DictionaryPattern(pattern);
                })
            ),
            specs: new DictionarySpecs(
                json.specs.map(spec => {
                    return new DictionarySpec(spec);
                })
            )
        });
    }

    return new Dictionary({
        id: new DictionaryIdentifier(ulid()),
        expected: new DictionaryExpected(""),
        patterns: new DictionaryPatterns([]),
        specs: new DictionarySpecs([])
    });
};
