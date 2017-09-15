// MIT © 2017 azu
"use strict";
const { getProofdict, fetchProofdict } = require("../index");
const assert = require("assert");
describe("index", () => {
    describe("get", () => {
        it("should return array of dict", () => {
            const dictionaries = getProofdict();
            assert.ok(Array.isArray(dictionaries));
            assert.ok(dictionaries.length > 0);
            const dict = dictionaries[0];
            assert.strictEqual(typeof dict.id, "string");
            assert.strictEqual(typeof dict.description, "string");
            assert.strictEqual(typeof dict.expected, "string");
            assert.ok(Array.isArray(dict.patterns));
            assert.ok(Array.isArray(dict.specs));
            assert.ok(Array.isArray(dict.tags));
        });
    });
    describe("fetch", () => {
        it("should fetch dictionary", () => {
            return fetchProofdict().then(dictionaries => {
                assert.ok(Array.isArray(dictionaries));
                assert.ok(dictionaries.length > 0);
                const dict = dictionaries[0];
                assert.strictEqual(typeof dict.id, "string");
                assert.strictEqual(typeof dict.description, "string");
                assert.strictEqual(typeof dict.expected, "string");
                assert.ok(Array.isArray(dict.patterns));
                assert.ok(Array.isArray(dict.specs));
                assert.ok(Array.isArray(dict.tags));
            });
        });
    });
});
