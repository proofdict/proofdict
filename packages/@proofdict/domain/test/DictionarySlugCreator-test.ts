// MIT © 2017 azu
import { createSlugFromDictionary } from "../src/Dictionary/DictionarySlugCreator";
import { createDictionary } from "../src/Dictionary/DictionaryFactory";
import * as assert from "assert";
import { DictionarySpec } from "../src";
import { DictionaryPattern } from "../src";
import { DictionaryExpected } from "../src";

describe("createSlugFromDictionary", () => {
    describe("when empty dictionary", () => {
        it("should return empty string", () => {
            const dictionary = createDictionary();
            const slug = createSlugFromDictionary(dictionary);
            assert.ok(typeof slug === "string");
        });
    });
    describe("when ECMAScript dictionary", () => {
        it("should return expected-wordClasses", () => {
            const dictionary = createDictionary()
                .inputExpected(new DictionaryExpected("ECMAScript $1"))
                .addPattern(new DictionaryPattern("/es (\\d+)/i"))
                .addSpec(
                    new DictionarySpec({
                        from: "--es 2015--es 6",
                        to: "--ECMAScript 2015--ECMAScript 6",
                    })
                );
            const slug = createSlugFromDictionary(dictionary);
            assert.strictEqual(slug, `ECMAScript_$1`);
        });
    });
});
