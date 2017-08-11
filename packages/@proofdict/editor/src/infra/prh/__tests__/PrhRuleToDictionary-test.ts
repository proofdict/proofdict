// MIT © 2017 azu
import * as prh from "prh";
import * as path from "path";
import { prhRuleToDictionary } from "../PrhRuleToDictionary";
import { Dictionary, DictionaryIdentifier, DictionarySerializer } from "../../../domain/Dictionary";
import * as assert from "assert";

describe("prhRuleToDictionary", () => {
    it("should return dictionary", () => {
        const engine = prh.fromYAMLFilePath(path.join(__dirname, "fixtures/input.yml"));
        const promises = engine.rules.map(prhRuleToDictionary);
        return Promise.all(promises).then((dictionaries: Dictionary[]) => {
            dictionaries.forEach(dictionary => {
                assert.ok(dictionary instanceof Dictionary, `${dictionary} should be instanceof Dictionary`);
            });
        });
    });
    it("yml to json", () => {
        const removeId = (dictionary: Dictionary): Dictionary => {
            dictionary.id = new DictionaryIdentifier("fixed");
            return dictionary;
        };
        const engine = prh.fromYAMLFilePath(path.join(__dirname, "fixtures/input.yml"));
        const promises = engine.rules.map(prhRuleToDictionary);
        return Promise.all(promises).then((dictionaries: Dictionary[]) => {
            const jsonList = dictionaries.map(dictionary => {
                return DictionarySerializer.toJSON(removeId(dictionary));
            });
            expect(jsonList).toMatchSnapshot("prh.yml-to-json");
        });
    });
});
