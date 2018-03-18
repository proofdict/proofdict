"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var proofdict_tester_1 = require("../../tester/src/proofdict-tester");
exports.assertYAML = function(yaml) {
    var json = yaml.safeLoad(fs.readFileSync(filePath, "utf8"));
    var tester = new proofdict_tester_1.ProofdictTester({
        dictionary: [json]
    });
    var testSpec = function(spec) {
        return tester.match(spec.from).then(function(result) {
            assert.ok(typeof result === "object", "should have result");
            assert.strictEqual(
                result.output,
                spec.to,
                "Not pass\nFrom    : " +
                    spec.from +
                    "\nTo      : " +
                    spec.to +
                    "                    \nResult  : " +
                    result.output +
                    "\nDetails : \n" +
                    JSON.stringify(result, null, 4) +
                    "                                   \nat " +
                    filePath +
                    ":1:1"
            );
        });
    };
    var promises = json.specs.map(function(spec) {
        return testSpec(spec);
    });
    return Promise.all(promises);
};
//# sourceMappingURL=assert.js.map
