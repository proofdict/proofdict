import * as assert from "assert";
import { DictionaryPattern } from "../DictionaryPattern";

describe("DictionaryPattern", function() {
    describe("/pattern/", () => {
        it("has not workBoundary", () => {
            const pattern = new DictionaryPattern("/pattern/");
            assert.strictEqual(pattern.hasWrappedWordBoundary, false);
        });
    });
    describe("/\\bpattern\\b/", () => {
        it("has not workBoundary", () => {
            const pattern = new DictionaryPattern("/\\bpattern\\b/");
            assert.strictEqual(pattern.hasWrappedWordBoundary, true);
        });
        it("should return /pattern/", () => {
            const pattern = new DictionaryPattern("/\\bpattern\\b/");
            assert.strictEqual(pattern.trimWorkBoundary(), "/pattern/");
        });
        it("should not change /\\bpattern\\b/", () => {
            const pattern = new DictionaryPattern("/\\bpattern\\b/");
            assert.strictEqual(pattern.addWordBoundary(), "/\\bpattern\\b/");
        });
    });

    describe("/a\\b/", () => {
        it("has not workBoundary", () => {
            const pattern = new DictionaryPattern("/a\\b/");
            assert.strictEqual(pattern.hasWrappedWordBoundary, false);
        });
    });
});
