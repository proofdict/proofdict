// MIT © 2017 azu
"use strict";
const getDictFiles = require("../tools/get-dict-files").getDictFiles;
const files = getDictFiles();
const Engine = require("prh").Engine;
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
describe("dict", () => {
    files.forEach(filePath => {
        const baseName = path.basename(filePath, ".yml");
        it(`${baseName}`, () => {
            const json = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
            try {
                const prh = new Engine({
                    version: 1,
                    rules: [
                        {
                            expected: json.expected,
                            patterns: json.patterns,
                            specs: json.specs.map(spec => {
                                return {
                                    from: spec.actual,
                                    to: spec.expected
                                }
                            })
                        }
                    ],
                });
            } catch (error) {
                console.log(`at ${filePath}:1:1`);
                throw error;
            }
        });
    })
});