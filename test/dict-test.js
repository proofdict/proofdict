// MIT © 2017 azu
"use strict";
const getDictFiles = require("../tools/get-dict-files").getDictFiles;
const files = getDictFiles();
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { ProofdictTester } = require("@proofdict/tester");
const { createDictionary } = require("../tools/build-dict");
describe("dict", () => {
    it("all dict check", () => {
        const proofdict = createDictionary();
        const tester = new ProofdictTester({ dictionary: proofdict });
        const testSpec = spec => {
            return tester.match(spec.from).then(result => {
                assert.ok(typeof result === "object", "should have result");
                assert.strictEqual(
                    result.output,
                    spec.to,
                    `Not pass
From    : ${spec.from}
To      : ${spec.to}                    
Result  : ${result.output}
Details : 
${JSON.stringify(result, null, 4)}                    
`
                );
            });
        };
        const promises = proofdict.map(dict => {
            const specPromises = dict.specs.map(testSpec);
            return Promise.all(specPromises);
        });
        return Promise.all(promises);
    });
    files.forEach(filePath => {
        const baseName = path.basename(filePath, ".yml");
        it(`${baseName}`, () => {
            const json = yaml.safeLoad(fs.readFileSync(filePath, "utf8"));
            const tester = new ProofdictTester({
                dictionary: [json]
            });
            const testSpec = spec => {
                return tester.match(spec.from).then(result => {
                    assert.ok(typeof result === "object", "should have result");
                    assert.strictEqual(
                        result.output,
                        spec.to,
                        `Not pass
From    : ${spec.from}
To      : ${spec.to}                    
Result  : ${result.output}
Details : 
${JSON.stringify(result, null, 4)}                                   
at ${filePath}:1:1`
                    );
                });
            };
            const promises = json.specs.map(spec => {
                return testSpec(spec);
            });
            return Promise.all(promises);
        });
    });
});
