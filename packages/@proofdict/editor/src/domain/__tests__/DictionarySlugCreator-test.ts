// MIT © 2017 azu
import { createSlugFromDictionary } from "../DictionarySlugCreator";
import { createDictionary } from "../DictionaryFactory";
import * as assert from "assert";
import { DictionarySpec } from "../DictionarySpec";
import { DictionaryPattern } from "../DictionaryPattern";
import { DictionaryExpected } from "../DictionaryExpected";
import { getUniqueTokens } from "../../infra/prh/Prh";
import { DictionaryWordClassesSerializer } from "../DictionaryWordClasses";

describe("createSlugFromDictionary", () => {
    describe("when empty dictionary", () => {
        it("should return empty string", () => {
            const slug = createSlugFromDictionary(createDictionary());
            assert.strictEqual(slug, "");
        });
    });
    describe("when ECMAScript dictionary", () => {
        it("should return expected-wordClasses", () => {
            const dictionary = createDictionary()
                .inputExpected(new DictionaryExpected("ECMAScript $1"))
                .addPattern(new DictionaryPattern("/es (\\d+)/i"))
                .addSpec(
                    new DictionarySpec({
                        actual: "--es 2015--es 6",
                        expected: "--ECMAScript 2015--ECMAScript 6"
                    })
                );
            return getUniqueTokens(dictionary).then(tokens => {
                const targetDictionary = dictionary.updateWordClasses(DictionaryWordClassesSerializer.fromJSON(tokens));
                const slug = createSlugFromDictionary(targetDictionary);
                assert.strictEqual(slug, "ECMAScript_$1--名詞-記号");
            });
        });
    });
});