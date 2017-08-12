// MIT © 2017 azu
"use strict";
const dictionries = require("../index");
const assert = require("assert");
describe("index", () => {
    it("should return array of dict", () => {
        assert.ok(Array.isArray(dictionries));
        assert.ok(dictionries.length > 0);
        const dict = dictionries[0];
        assert.strictEqual(typeof dict.id, "string");
        assert.strictEqual(typeof dict.description, "string");
        assert.strictEqual(typeof dict.expected, "string");
        assert.ok(Array.isArray(dict.patterns));
        assert.ok(Array.isArray(dict.specs));
        assert.ok(Array.isArray(dict.tags));
    });
});
