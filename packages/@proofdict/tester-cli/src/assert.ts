import { ProofdictTester, Proofdict, ProofdictRule } from "@proofdict/tester";
import * as fs from "fs";
import * as assert from "assert";
import { safeLoad } from "js-yaml";

export const assertProofdictJSON = (dictionary: Proofdict) => {
    const tester = new ProofdictTester({
        dictionary: dictionary
    });
    const promises = dictionary.map(dict => {
        if (!dict.specs) {
            return Promise.resolve([]);
        }
        const specPromises = dict.specs.map(spec => {
            return tester.match(spec.from).then(result => {
                assert.ok(typeof result === "object", "should have result");
                assert.strictEqual(
                    result.output,
                    spec.to,
                    `This rule's spec is invalid:
From    : ${spec.from}
To      : ${spec.to}                    
Result  : ${result.output}
Details : 
${JSON.stringify(result, null, 4)}                    
`
                );
            });
        });
        return Promise.all(specPromises);
    });
    return Promise.all(promises);
};
/**
 * Assert each json
 */
export const assertJSON = (filePath: string) => {
    const json: Proofdict = safeLoad(fs.readFileSync(filePath, "utf8"));
    return assertProofdictJSON(json);
};

/**
 * Assert: Each dictionary
 */
export const assertYAML = (filePath: string) => {
    const json: ProofdictRule = safeLoad(fs.readFileSync(filePath, "utf8"));
    if (!json.specs) {
        return Promise.resolve([]);
    }
    return assertProofdictJSON([json]);
};
