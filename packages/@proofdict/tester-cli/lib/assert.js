"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tester_1 = require("@proofdict/tester");
var fs = require("fs");
var assert = require("assert");
var js_yaml_1 = require("js-yaml");
exports.assertProofdictJSON = function(dictionary) {
    var tester = new tester_1.ProofdictTester({
        dictionary: dictionary
    });
    var promises = dictionary.map(function(dict) {
        if (!dict.specs) {
            return Promise.resolve([]);
        }
        var specPromises = dict.specs.map(function(spec) {
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
                        "                    \n"
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
exports.assertJSON = function(filePath) {
    var json = js_yaml_1.safeLoad(fs.readFileSync(filePath, "utf8"));
    return exports.assertProofdictJSON(json);
};
/**
 * Assert: Each dictionary
 */
exports.assertYAML = function(filePath) {
    var json = js_yaml_1.safeLoad(fs.readFileSync(filePath, "utf8"));
    if (!json.specs) {
        return;
    }
    return exports.assertProofdictJSON([json]);
};
//# sourceMappingURL=assert.js.map
