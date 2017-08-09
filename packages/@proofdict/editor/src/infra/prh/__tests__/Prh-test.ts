// MIT © 2017 azu
import { testPattern } from "../Prh";
import { createDictionary } from "../../../domain/DictionaryFactory";
import { DictionaryPattern } from "../../../domain/DictionaryPattern";
import { DictionaryExpected } from "../../../domain/DictionaryExpected";
import * as assert from "assert";
import { DictionarySpec } from "../../../domain/DictionarySpec";

describe("Prh#testPattern", () => {
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
