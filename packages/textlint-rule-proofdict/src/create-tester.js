// MIT © 2017 azu
"use strict";
const { ProofdictTester } = require("proofdict-tester");
let currentTester = null;
let checkedLastTime = -1;
/**
 * @param {number} lastUpdated
 * @param {*} dictionary
 * @param {string[]} whitelistTags
 * @param {string[]}  blacklistTags
 * @returns {ProofdictTester}
 */
export const createTester = ({ lastUpdated, dictionary, whitelistTags, blacklistTags }) => {
    if (currentTester === null && checkedLastTime < lastUpdated) {
        checkedLastTime = lastUpdated;
        currentTester = new ProofdictTester({
            dictionary,
            whitelistTags,
            blacklistTags
        });
        return currentTester;
    }
    return currentTester;
};
