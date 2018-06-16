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
                assert.strictEqual(
                    result.output,
                    spec.to,
                    `This rule's spec is invalid:
Expected: ${spec.to}
Actual  : ${result.output}
---
From    : ${spec.from}
To      : ${spec.to}
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

export const isProofdictRule = (v: any): v is ProofdictRule => {
    if (!v) {
        return false;
    }
    return true;
};

export const isProofdict = (v: any): v is Proofdict => {
    if (!v) {
        return false;
    }
    return true;
};
/**
 * Assert each json
 */
export const assertJSON = (filePath: string) => {
    const json = safeLoad(fs.readFileSync(filePath, "utf8"));
    if (!isProofdict(json)) {
        throw new Error(`${filePath} is undefined`);
    }
    return assertProofdictJSON(json);
};

/**
 * Assert: Each dictionary
 */
export const assertYAML = (filePath: string) => {
    const json = safeLoad(fs.readFileSync(filePath, "utf8"));
    if (!isProofdictRule(json)) {
        throw new Error(`${filePath} is undefined`);
    }
    if (!json.specs) {
        return Promise.resolve([]);
    }
    return assertProofdictJSON([json]);
};
