import { RuleOption } from "../RuleOptions";
import { MODE } from "../mode";
import { openStorage } from "../dictionary-storage";
import * as globby from "globby";
import yaml from "js-yaml";
import { Proofdict, ProofdictRule } from "@proofdict/tester";

/**
 * @param options
 * @param {string} mode
 * @returns {*}
 */
export const getDictionary = async (options: RuleOption, mode: MODE): Promise<Proofdict | undefined> => {
    // prefer `dictionary` option
    if (options.proofdict !== undefined) {
        return options.proofdict;
    }
    const storage = await openStorage();
    let proofDictData: Proofdict | undefined;
    // NETWORK
    if (mode === MODE.NETWORK) {
        try {
            proofDictData = await storage.get("proofdict");
        } catch (error) {
            await storage.delete("proofdict");
        }
    }
    // LOCAL
    if (mode === MODE.LOCAL && options.dictGlob) {
        try {
            const files = globby.sync(options.dictGlob);
            proofDictData = files.map((filePath) => {
                return yaml.safeLoad(filePath) as ProofdictRule;
            });
        } catch (error) {}
    }
    return proofDictData;
};
