import { Dictionary, DictionaryIdentifier } from "./Dictionary";
import { DictionaryExpected } from "./DictionaryExpected";
import { DictionaryPatterns } from "./DictionaryPatterns";
import { DictionarySpecs } from "./DictionarySpecs";
import { DictionaryWordClasses } from "./DictionaryWordClasses";
import { DictionaryDescription } from "./DictionaryDescription";

const ulid = require("ulid");

export const createDictionary = () => {
    return new Dictionary({
        id: new DictionaryIdentifier(ulid()),
        description: new DictionaryDescription(""),
        expected: new DictionaryExpected(""),
        patterns: new DictionaryPatterns([]),
        specs: new DictionarySpecs([]),
        wordClasses: new DictionaryWordClasses([])
    });
};
