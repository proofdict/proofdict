import fs from "fs";
import * as globby from "globby";
import yaml from "js-yaml";
import { ProofdictRule } from "@proofdict/types";
import { RuleOption } from "../RuleOptions";
import { Proofdict } from "@proofdict/tester";
import { MODE } from "../mode";

export default (options: RuleOption, mode: MODE): Proofdict | undefined => {
    if (mode !== MODE.LOCAL) {
        return;
    }
    if (!options.dictGlob) {
        return;
    }
    try {
        const files = globby.sync(options.dictGlob);
        return files.map((filePath) => {
            return yaml.safeLoad(fs.readFileSync(filePath, "utf8")) as ProofdictRule;
        });
    } catch (error) {
        console.error(error);
    }
    return;
};
