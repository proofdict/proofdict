// MIT © 2017 azu
"use strict";
const { ProofdictTester } = require("proofdict-tester");
let currentTester = null;
let checkedLastTime = -1;
export const createTester = (lastUpdated, dictionary) => {
    if (checkedLastTime < lastUpdated) {
        checkedLastTime = lastUpdated;
        currentTester = new ProofdictTester({
            dictionary
        });
        return currentTester;
    }
    return currentTester;
};