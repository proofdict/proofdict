// MIT © 2017 azu
import { testPattern } from "../Prh";
import { createDictionary } from "../../../domain/DictionaryFactory";
import { DictionaryPattern } from "../../../domain/DictionaryPattern";
import { DictionaryExpect } from "../../../domain/DictionaryExpect";
import * as assert from "assert";
import { DictionarySpec } from "../../../domain/DictionarySpec";

describe("Prh#testPattern", () => {
    it("should return diff", () => {
        const dictionary = createDictionary()
            .inputExpect(new DictionaryExpect("expected"))
            .addPattern(new DictionaryPattern("pattern"));
        const result = testPattern(
            dictionary,
            new DictionarySpec({
                actual: "pattern"
            })
        );
        if (result instanceof DictionarySpec) {
            assert.strictEqual(result.actual, "pattern");
            assert.strictEqual(result.expected, "expected");
        } else {
            throw new Error("result is not DictionarySpec");
        }
    });
    it("should return Error if invalid pattern", () => {
        const dictionary = createDictionary()
            .inputExpect(new DictionaryExpect("/broken"))
            .addPattern(new DictionaryPattern("/broken?:?*"));
        const error = testPattern(
            dictionary,
            new DictionarySpec({
                actual: "pattern"
            })
        );
        assert.ok(error instanceof Error);
    });
});
