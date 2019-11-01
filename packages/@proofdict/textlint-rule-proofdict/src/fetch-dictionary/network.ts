import { RuleOption } from "../RuleOptions";
import { MODE } from "../mode";
import { storage } from "../dictionary-storage";
import * as globby from "globby";
import yaml from "js-yaml";
import { Proofdict } from "@proofdict/tester";

/**
 * @param options
 * @param {string} mode
 * @returns {*}
 */
export const getDictionary = (options: RuleOption, mode: MODE): Proofdict => {
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
    if (mode === MODE.LOCAL && options.dictGlob) {
        try {
            const files = globby.sync(options.dictGlob);
            proofDictData = files.map(filePath => {
                return yaml.safeLoad(filePath);
            });
        } catch (error) {}
    }
    return proofDictData;
};
