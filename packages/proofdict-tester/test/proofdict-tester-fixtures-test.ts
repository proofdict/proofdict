// MIT © 2017 azu
import { ProofdictRule, ProofdictTester } from "../src/proofdict-tester";
import * as assert from "assert";

describe("ProofdictTester fixtures", () => {
    const proofdict: ProofdictRule[] = require("./fixtures/proofdict.json");
    const tester = new ProofdictTester({ dictionary: proofdict });
    proofdict
        .filter(dict => dict.specs.length > 0)
        .forEach(dict => {
            describe(`${dict.expected}`, () => {
                dict.specs.forEach((spec) => {
                    it(`${spec.from} => ${spec.to}`, () => {
                        return tester.replace(spec.from).then(result => {
                            assert.strictEqual(result, spec.to);
                        });
                    });
                });
            });
        });
});
