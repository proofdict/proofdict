import * as assert from "assert";
import { AllowPatterns } from "../src/AllowPatterns";

describe("AllowPatterns", function () {
    describe("when allows is empty", () => {
        it("should not alllow", () => {
            const allowPatterns = new AllowPatterns({
                id: "01BQ92YZ6QR8RJKA5Y8W2F9NMY",
                description: "Reference https://webkit.org/",
                expected: "WebKit",
                patterns: ["/\\bwebkit\\b/i"],
                tags: ["noun"]
            });
            assert.ok(!allowPatterns.match("webkit"), "should not match");
        });
    });
    describe("when allows is [node-webkit]", () => {
        it("should allow node-webkit", () => {
            const allowPatterns = new AllowPatterns({
                id: "01BQ92YZ6QR8RJKA5Y8W2F9NMY",
                description: "Reference https://webkit.org/",
                expected: "WebKit",
                patterns: ["/\\bwebkit\\b/i"],
                allows: ["node-webkit"],
                tags: ["noun"]
            });
            assert.ok(allowPatterns.match("node-webkit"), "should allow word");
        });
    });
    describe("when allows is [{{COMBINATION_WORD}}]", () => {
        it("should allow combination word", () => {
            const allowPatterns = new AllowPatterns({
                id: "01BQ92YZ6QR8RJKA5Y8W2F9NMY",
                description: "Reference https://webkit.org/",
                expected: "WebKit",
                patterns: ["/\\bwebkit\\b/i"],
                allows: ["{{COMBINATION_WORD}}"],
                tags: ["noun"]
            });
            assert.ok(allowPatterns.match("node-webkit"), "should allow COMBINATION_WORD");
        });
    });
});
