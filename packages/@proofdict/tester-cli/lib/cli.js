"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var assert_1 = require("./assert");
exports.execute = function(globPattern) {
    var ext = path.extname(globPattern);
    if (ext === ".yml" || ext === ".yaml") {
        return assert_1.assertYAML(globPattern);
    } else {
    }
};
//# sourceMappingURL=cli.js.map
