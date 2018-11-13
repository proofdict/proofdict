// MIT © 2017 azu
import { getMatchExpectedWords, getUniqueTokens, testPattern } from "../Prh";
import { createDictionary } from "../../../domain/Dictionary/DictionaryFactory";
import { DictionaryPattern } from "../../../domain/Dictionary/DictionaryPattern";
import { DictionaryExpected } from "../../../domain/Dictionary/DictionaryExpected";
import * as assert from "assert";
import { DictionarySpec } from "../../../domain/Dictionary/DictionarySpec";

describe("Prh", () => {
    describe("#testPattern", () => {
        it("should handle regexp-like string", async () => {
            const dictionary = createDictionary()
                .inputExpected(new DictionaryExpected("jQuery"))
                .addPattern(new DictionaryPattern("/jquery/i"));
            const result = await testPattern(
                dictionary,
                new DictionarySpec({
                    from: "JQUERY"
                })
            );
            assert.strictEqual(result.from, "JQUERY");
            assert.strictEqual(result.to, "jQuery");
        });
        it("should return spec", async () => {
            const dictionary = createDictionary()
                .inputExpected(new DictionaryExpected("expected"))
                .addPattern(new DictionaryPattern("pattern"));
            const result = await testPattern(
                dictionary,
                new DictionarySpec({
                    from: "pattern"
                })
            );
            assert.strictEqual(result.from, "pattern");
            assert.strictEqual(result.to, "expected");
        });
        it("should correct", async () => {
            const dictionary = createDictionary()
                .inputExpected(new DictionaryExpected("ECMAScript $1"))
                .addPattern(new DictionaryPattern("/ES (\\d+)/i"))
                .addPattern(new DictionaryPattern("/ES(\\d+)/i"));
            const result = await testPattern(
                dictionary,
                new DictionarySpec({
                    from: "ES2015"
                })
            );
            assert.strictEqual(result.from, "ES2015");
            assert.strictEqual(result.to, "ECMAScript 2015");
        });
    });
    describe("#getMatchExpectedWords", () => {
        it("should return match test", () => {
            const dictionary = createDictionary()
                .inputExpected(new DictionaryExpected("ECMAScript $1"))
                .addPattern(new DictionaryPattern("/es (\\d+)/i"));
            const words = getMatchExpectedWords(
                dictionary,
                new DictionarySpec({
                    from: "--es 2015--es 6"
                })
            );
            assert.deepEqual(words, ["ECMAScript 2015", "ECMAScript 6"]);
        });
    });
    describe("#getUniqueTokens", () => {
        it("should return match test", () => {
            const dictionary = createDictionary()
                .inputExpected(new DictionaryExpected("ECMAScript $1"))
                .addPattern(new DictionaryPattern("/es (\\d+)/i"))
                .addSpec(
                    new DictionarySpec({
                        from: "--es 2015--es 6",
                        to: "--ECMAScript 2015--ECMAScript 6"
                    })
                );
            return getUniqueTokens(dictionary).then(tokens => {
                assert.deepEqual(tokens, [
                    {
                        word_type: "UNKNOWN",
                        surface_form: "ECMAScript",
                        pos: "名詞",
                        pos_detail_1: "固有名詞",
                        pos_detail_2: "組織",
                        pos_detail_3: "*",
                        conjugated_type: "*",
                        conjugated_form: "*",
                        basic_form: "*",
                        reading: undefined,
                        pronunciation: undefined
                    },
                    {
                        word_type: "UNKNOWN",
                        surface_form: " ",
                        pos: "記号",
                        pos_detail_1: "空白",
                        pos_detail_2: "*",
                        pos_detail_3: "*",
                        conjugated_type: "*",
                        conjugated_form: "*",
                        basic_form: "*",
                        reading: undefined,
                        pronunciation: undefined
                    }
                ]);
            });
        });
    });
});
