import { Dictionary, DictionaryIdentifier } from "./Dictionary";
import { DictionaryExpected } from "./DictionaryExpected";
import { DictionaryPatterns } from "./DictionaryPatterns";
import { DictionarySpecs } from "./DictionarySpecs";
import { DictionaryDescription } from "./DictionaryDescription";

const ulid = require("ulid");

const createEmptyDictionaryWithId = (id: string) => {
    return new Dictionary({
        id: new DictionaryIdentifier(id),
        description: new DictionaryDescription(""),
        expected: new DictionaryExpected(""),
        patterns: new DictionaryPatterns([]),
        specs: new DictionarySpecs([])
    });
};

export const resetDictionary = (dictionary: Dictionary) => {
    return createEmptyDictionaryWithId(dictionary.id.toValue());
};

export const createDictionary = () => {
    return createEmptyDictionaryWithId(ulid());
};
