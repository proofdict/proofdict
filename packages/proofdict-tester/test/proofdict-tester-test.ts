// MIT © 2017 azu
import { ProofdictRule, ProofdictTester } from "../src/proofdict-tester";
import * as assert from "assert";

describe("ProofdictTester", () => {
    describe("#replace", () => {
        it("should return replace result", () => {
            const proofdict: ProofdictRule[] = require("./fixtures/proofdict.json");
            const tester = new ProofdictTester({ dictionary: proofdict });
            const text = "This is webkit desu.";
            return tester.replace(text).then(result => {
                assert.strictEqual(result, "This is WebKit desu.")
            });
        });
    });
    describe("#match", () => {
        it("last noun pattern", () => {
            const proofdict: ProofdictRule[] = require("./fixtures/proofdict.json");
            const tester = new ProofdictTester({ dictionary: proofdict });
            const text = "This is webkit";
            return tester.match(text).then(result => {
                assert.strictEqual(result.details.length, 1);
                const [detail] = result.details;
                assert.deepStrictEqual(detail.rule, {
                    "id": "01BQ92YZ6QR8RJKA5Y8W2F9NMY",
                    "description": "Reference https://webkit.org/",
                    "expected": "WebKit",
                    "patterns": [
                        "/\\bwebkit\\b/i"
                    ],
                    "tags": [
                        "noun"
                    ]
                });
                assert.strictEqual(detail.actual, "webkit");
                assert.strictEqual(detail.expected, "WebKit");
                assert.strictEqual(detail.description, "Reference https://webkit.org/");
                assert.strictEqual(detail.matchStartIndex, 8);
                assert.strictEqual(detail.matchEndIndex, 14);
                assert.strictEqual(text.slice(detail.matchStartIndex, detail.matchEndIndex), "webkit");
            });
        });
        it("first noun pattern", () => {
            const proofdict: ProofdictRule[] = require("./fixtures/proofdict.json");
            const tester = new ProofdictTester({ dictionary: proofdict });
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

        it("noun + regexp pattern", () => {
            const tester = new ProofdictTester({
                dictionary: [
                    {
                        "id": "01BQ92YYBH2EZP1E4KVNDMXYV9",
                        "description": "",
                        "expected": "Pointer Events",
                        "patterns": [
                            "/pointer event/i",
                            "/pointer events/i"
                        ],
                        "tags": [
                            "JavaScript",
                            "noun"
                        ]
                    }
                ]
            });
            const text = "Pointer Events is an event.";
            return tester.match(text).then(result => {
                assert.strictEqual(result.details.length, 0);
            });
        });
        it("non-noun pattern", () => {
            const proofdict: ProofdictRule[] = require("./fixtures/proofdict.json");
            const tester = new ProofdictTester({ dictionary: proofdict });
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
