// MIT © 2017 azu
"use strict";
import { MODE } from "./mode";
import { storage } from "./dictionary-storage";
import { Proofdict, ProofdictTester } from "@proofdict/tester";
import { RuleOption } from "./RuleOptions";

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

/**
 * @param options
 * @param {string} mode
 * @returns {*}
 */
export const getDictionary = (options: RuleOption, mode: string): any => {
    // prefer `dictionary` option
    if (options.proofdict !== undefined) {
        return options.proofdict;
    }
    let proofDictData;
    // NETWORK
    if (mode === MODE.NETWORK) {
        try {
            const cachedProofdict = storage.getItem("proofdict");
            proofDictData = JSON.parse(cachedProofdict);
        } catch (error) {
            storage.removeItem("proofdict");
        }
    }
    // LOCAL
    if (mode === MODE.LOCAL) {
        // TODO: not implemented
    }
    return proofDictData;
};
