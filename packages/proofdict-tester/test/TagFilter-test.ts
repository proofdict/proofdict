// MIT © 2017 azu
import { Proofdict, ProofdictRule } from "../src/proofdict-tester";
import { filterByTags } from "../src/TagFilter";
import * as assert from "assert";

const proofdict: Proofdict = require("./fixtures/proofdict.json");
const shouldHaveTag = (tag: string) => {
    return (item: ProofdictRule) => {
        assert.ok(item.tags.indexOf(tag) !== -1, `item should have tag(${tag}). item: ${JSON.stringify(item)}`);
    };
};
const shouldNotHaveTag = (tag: string) => {
    return (item: ProofdictRule) => {
        assert.ok(item.tags.indexOf(tag) === -1, `item should not have tag(${tag}). item: ${JSON.stringify(item)}`);
    };
};
describe("TagFilter", () => {
    describe("#filterByTags", () => {
        it("whitelist options filter items", () => {
            const whitelistTags = ["noun"];
            const items = filterByTags(proofdict, whitelistTags);
            items.forEach(item => {
                shouldHaveTag("noun")(item);
            });
        });
        it("whitelist options filter items by multiple tags", () => {
            const whitelistTags = ["noun", "JavaScript"];
            const items = filterByTags(proofdict, whitelistTags);
            items.forEach(item => {
                shouldHaveTag("noun")(item);
                shouldHaveTag("JavaScript")(item);
            });
        });
        it("blacklist options reject items", () => {
            const blacklistTags = ["noun"];
            const items = filterByTags(proofdict, [], blacklistTags);
            items.forEach(item => {
                shouldNotHaveTag("noun")(item);
            });
        });
        it("blacklist options reject items by multiple tags", () => {
            const blacklistTags = ["noun", "JavaScript"];
            const items = filterByTags(proofdict, [], blacklistTags);
            items.forEach(item => {
                shouldNotHaveTag("noun")(item);
                shouldNotHaveTag("JavaScript")(item);
            });
        });
        it("whitelist options filter items", () => {
            const whitelistTags = ["noun"];
            const items = filterByTags(proofdict, whitelistTags);
            items.forEach(item => {
                shouldHaveTag("noun")(item);
            });
        });
        it("whitelist/blacklist options, prefer to use whitelist", () => {
            const whitelist = ["noun"];
            const blacklistTags = ["noun"];
            const items = filterByTags(proofdict, whitelist, blacklistTags);
            items.forEach(item => {
                shouldHaveTag("noun")(item);
            });
        });
    })
});
