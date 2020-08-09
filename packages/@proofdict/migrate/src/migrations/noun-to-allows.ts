import * as yaml from "js-yaml";
import { DictionaryJSON } from "@proofdict/domain";

export const migrate = (content: string, filePath: string) => {
    const json: DictionaryJSON = yaml.safeLoad(content, {
        filename: filePath,
    }) as DictionaryJSON;
    const WORD = "{{COMBINATION_WORD}}";
    if (json.tags.includes("noun")) {
        if (Array.isArray(json.allows) && !json.allows.includes(WORD)) {
            json.allows.push(WORD);
        } else {
            json.allows = [WORD];
        }
    }
    return yaml.safeDump(json);
};
