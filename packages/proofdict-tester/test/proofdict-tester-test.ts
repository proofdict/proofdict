// MIT © 2017 azu
import { Proofdict, ProofdictTester } from "../src/proofdict-tester";
import * as assert from "assert";

describe("ProofdictTester", () => {
    describe("#replace", () => {
        it("should return replace result", () => {
            const proofdict: Proofdict[] = require("./fixtures/proofdict.json");
            const tester = new ProofdictTester(proofdict);
            const text = "This is webkit desu.";
            return tester.replace(text).then(result => {
                assert.strictEqual(result, "This is WebKit desu.")
            });
        });
    });
    describe("#match", () => {
        it("last noun pattern", () => {
            const proofdict: Proofdict[] = require("./fixtures/proofdict.json");
            const tester = new ProofdictTester(proofdict);
            const text = "This is webkit";
            return tester.match(text).then(result => {
                assert.strictEqual(result.details.length, 1);
                const [detail] = result.details;
                assert.strictEqual(detail.actual, "webkit");
                assert.strictEqual(detail.expected, "WebKit");
                assert.strictEqual(detail.description, "Reference https://webkit.org/");
                assert.strictEqual(detail.matchStartIndex, 8);
                assert.strictEqual(detail.matchEndIndex, 14);
                assert.strictEqual(text.slice(detail.matchStartIndex, detail.matchEndIndex), "webkit");
            });
        });
        it("first noun pattern", () => {
            const proofdict: Proofdict[] = require("./fixtures/proofdict.json");
            const tester = new ProofdictTester(proofdict);
            const text = "SourceMap is text.";
            return tester.match(text).then(result => {
                assert.strictEqual(result.details.length, 1);
                const [detail] = result.details;
                assert.strictEqual(detail.actual, "SourceMap", "actual");
                assert.strictEqual(detail.expected, "Source Map", "expected");
                assert.strictEqual(detail.matchStartIndex, 0);
                assert.strictEqual(detail.matchEndIndex, 9);
                assert.strictEqual(text.slice(detail.matchStartIndex, detail.matchEndIndex), "SourceMap");
            });
        });
        it("non-noun pattern", () => {
            const proofdict: Proofdict[] = require("./fixtures/proofdict.json");
            const tester = new ProofdictTester(proofdict);
            const text = "Workaound is typo.";
            return tester.match(text).then(result => {
                assert.strictEqual(result.details.length, 1);
                const [detail] = result.details;
                assert.strictEqual(detail.actual, "Workaound");
                assert.strictEqual(detail.expected, "Workaround");
                assert.strictEqual(detail.matchStartIndex, 0);
                assert.strictEqual(detail.matchEndIndex, 9);
                assert.strictEqual(text.slice(detail.matchStartIndex, detail.matchEndIndex), "Workaound");
            });
        });
    });
});