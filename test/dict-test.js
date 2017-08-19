// MIT © 2017 azu
"use strict";
const { parseRegExpString } = require("prh/lib/utils/regexp");
const getDictFiles = require("../tools/get-dict-files").getDictFiles;
const files = getDictFiles();
const Engine = require("prh").Engine;
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

function concat(args, flags) {
    var prevFlags = flags || "";
    var foundRegExp = false;
    var result = args.reduce(function(p, c) {
        if (typeof c === "string") {
            return p + c;
        }
        else if (c instanceof RegExp) {
            c.flags.split("").sort();
            var currentFlags = c.flags.split("").sort().join("");
            if (foundRegExp) {
                if (prevFlags !== currentFlags) {
                    throw new Error("combining different flags " + prevFlags + " and " + currentFlags);
                }
            }
            prevFlags = currentFlags;
            foundRegExp = true;
            return p + c.source;
        }
        else {
            throw new Error("unknown type: " + c);
        }
    }, "");
    return new RegExp(result, prevFlags);
}

const wrapWordBoundary = (pattern) => {
    let result;
    let flags;
    if (typeof pattern === "string") {
        result = pattern;
    } else if (pattern instanceof RegExp) {
        result = pattern.source;
        flags = pattern.flags;
    } else {
        throw new Error(`unknown type: ${pattern}`);
    }
    return [
        concat(["[-\\w]", result], flags),
        concat([result, "[-\\w]"], flags)
    ]
};

const createWordBoundaryPatterns = (pattern) => {
    const regExp = parseRegExpString(pattern);
    if (regExp === null) {
        return wrapWordBoundary(pattern);
    }
    return wrapWordBoundary(regExp);
};
const convertPatternsToWordBoundaryPatterns = (patterns) => {
    let wordBoundaryPatterns = [];
    patterns.forEach(pattern => {
        const results = createWordBoundaryPatterns(pattern);
        wordBoundaryPatterns = wordBoundaryPatterns.concat(results);
    });
    return wordBoundaryPatterns;
};
describe("dict", () => {
    files.forEach(filePath => {
        const baseName = path.basename(filePath, ".yml");
        it(`${baseName}`, () => {
            const json = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
            const isNoun = json.tags.indexOf("noun") !== -1;
            const prhEngine = new Engine({
                version: 1,
                rules: [
                    {
                        expected: json.expected,
                        patterns: json.patterns
                    }
                ],
            });
            const testSpec = (prhEngine, spec, isNoun) => {
                const diff = prhEngine.makeChangeSet(null, spec.from);
                if (isNoun) {
                    const expectPatterns = convertPatternsToWordBoundaryPatterns(json.patterns);
                    const isExpected = expectPatterns.some(expectPattern => {
                        return expectPattern.test(spec.from);
                    });
                    if (isExpected) {
                        return;
                    }
                    const result = diff.applyChangeSets(spec.from);
                    assert.strictEqual(result, spec.to, `Not pass
Before  : ${spec.from}
Expected: ${spec.to}                    
Actual  : ${result}                    
at ${filePath}:1:1`);
                } else {
                    const result = diff.applyChangeSets(spec.from);
                    assert.strictEqual(result, spec.to, `Not pass
Before  : ${spec.from}
Expected: ${spec.to}                    
Actual  : ${result}                   
at ${filePath}:1:1`);
                }
            };
            json.specs.forEach(spec => {
                testSpec(prhEngine, spec, isNoun);
            });
        });
    })
});