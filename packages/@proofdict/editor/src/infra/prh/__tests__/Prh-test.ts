// MIT © 2017 azu
import { getMatchExpectedWords, getUniqueTokens, testPattern } from "../Prh";
import { createDictionary } from "../../../domain/DictionaryFactory";
import { DictionaryPattern } from "../../../domain/DictionaryPattern";
import { DictionaryExpected } from "../../../domain/DictionaryExpected";
import * as assert from "assert";
import { DictionarySpec } from "../../../domain/DictionarySpec";

describe("Prh", () => {
    describe("#testPattern", () => {
        it("should handle regexp-like string", () => {
            const dictionary = createDictionary()
                .inputExpected(new DictionaryExpected("jQuery"))
                .addPattern(new DictionaryPattern("/jquery/i"));
            const result = testPattern(
                dictionary,
                new DictionarySpec({
                    actual: "JQUERY"
                })
            );
            assert.strictEqual(result.actual, "JQUERY");
            assert.strictEqual(result.expected, "jQuery");
        });
        it("should return spec", () => {
            const dictionary = createDictionary()
                .inputExpected(new DictionaryExpected("expected"))
                .addPattern(new DictionaryPattern("pattern"));
            const result = testPattern(
                dictionary,
                new DictionarySpec({
                    actual: "pattern"
                })
            );
            assert.strictEqual(result.actual, "pattern");
            assert.strictEqual(result.expected, "expected");
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
                    actual: "--es 2015--es 6"
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
                        actual: "--es 2015--es 6",
                        expected: "--ECMAScript 2015--ECMAScript 6"
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
