import { Dictionary, DictionaryIdentifier } from "./Dictionary";
import { DictionaryExpect } from "./DictionaryExpect";
import { DictionaryPatterns } from "./DictionaryPatterns";
import { DictionarySpecs } from "./DictionarySpecs";

const ulid = require("ulid");

export const createDictionary = () => {
    return new Dictionary({
        id: new DictionaryIdentifier(ulid()),
        expect: new DictionaryExpect(""),
        patterns: new DictionaryPatterns([]),
        specs: new DictionarySpecs([])
    });
};
