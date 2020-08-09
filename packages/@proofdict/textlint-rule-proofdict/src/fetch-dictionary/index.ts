import { RuleOption } from "../RuleOptions";
import { MODE } from "../mode";
import { openStorage } from "../dictionary-storage";
import { Proofdict } from "@proofdict/tester";
import loadFromLocal from "./node";

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
    if (mode === MODE.LOCAL) {
        // This module will be replaced with noop in browser
        // package.json "browser" field define it
        // https://github.com/defunctzombie/package-browser-field-spec
        return loadFromLocal(options, mode);
    }
    return proofDictData;
};
