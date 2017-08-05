import { Dictionary, DictionaryIdentifier } from "./Dictionary";
const ulid = require("ulid");

export const createDictionary = () => {
    return new Dictionary({
        id: new DictionaryIdentifier(ulid())
    });
};
