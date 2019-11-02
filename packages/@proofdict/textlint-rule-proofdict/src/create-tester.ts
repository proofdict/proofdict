// MIT © 2017 azu
"use strict";
import { Proofdict, ProofdictTester } from "@proofdict/tester";

let currentTester: null | ProofdictTester = null;
let checkedLastTime = -1;
export const createTester = ({
    lastUpdated,
    dictionary,
    allowTags,
    denyTags,
    disableTesterCache
}: {
    lastUpdated: number;
    dictionary: Proofdict;
    allowTags: string[];
    denyTags: string[];
    disableTesterCache: boolean;
}): ProofdictTester => {
    if (disableTesterCache) {
        checkedLastTime = lastUpdated;
        currentTester = new ProofdictTester({
            dictionary,
            allowTags: allowTags,
            denyTags: denyTags
        });
        return currentTester;
    } else if (currentTester === null) {
        checkedLastTime = lastUpdated;
        currentTester = new ProofdictTester({
            dictionary,
            allowTags: allowTags,
            denyTags: denyTags
        });
        return currentTester;
    } else if (checkedLastTime < lastUpdated) {
        checkedLastTime = lastUpdated;
        currentTester = new ProofdictTester({
            dictionary,
            allowTags: allowTags,
            denyTags: denyTags
        });
        return currentTester;
    }
    return currentTester;
};
