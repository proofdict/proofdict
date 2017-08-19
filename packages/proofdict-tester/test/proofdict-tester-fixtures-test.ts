// MIT © 2017 azu
import { Proofdict, ProofdictTester } from "../src/proofdict-tester";
import * as assert from "assert";

const { getProofdict } = require("proofdict");
describe("ProofdictTester fixtures", () => {
    const proofdict: Proofdict[] = getProofdict();
    const tester = new ProofdictTester(proofdict);
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