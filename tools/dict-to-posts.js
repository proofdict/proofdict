// MIT © 2017 azu
"use strict";
const fs = require("fs");
const moment = require("moment");
const yaml = require("js-yaml");
const path = require("path");
const { getModifiedDate } = require("./helper/git-date-helper");
const table = require('markdown-table');
const getDictFiles = require("./get-dict-files").getDictFiles;
const makeDir = require('make-dir');
const del = require('del');

const convertJsonToYamlHeader = (filePath, json) => {
    const fileNameWithExt = path.basename(filePath);
    const modifiedDate = getModifiedDate(filePath);
    const dumpData = yaml.safeDump(Object.assign({
        layout: "post",
        title: json.expected,
        author: "azu",
        editURL: `https://github.com/proofdict/proofdict/edit/master/dict/${fileNameWithExt}`,
        date: modifiedDate,
        permalink: `/term/${json.id}`
    }, json));
    return `---
${dumpData}
---`
};

const loadYaml = (filePath) => {
    try {
        return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error(error);
        return null
    }
};

function createSpecTable(filePath, json) {
    let specs = json.specs;
    let hasSpec = specs && Array.isArray(specs) && specs.length > 0;
    if (!(hasSpec)) {
        const fileNameWithExt = path.basename(filePath);
        return `No examples. [Welcome to Pull Request](https://github.com/jser/jser.info/edit/master/dict/${fileNameWithExt})!`
    }
    const cells = [
        ['From', 'To']
    ];
    specs.forEach(spec => {
        cells.push([spec.actual, spec.expected]);
    });
    return table(cells);

}

function outputMarkdown(filePath, json, outputFilePath) {
    const header = convertJsonToYamlHeader(filePath, json);
    const specTable = createSpecTable(filePath, json);
    const body = `${header}

## Description

${json.description || "No Description "}

## Patterns

This dictionary match following patterns:

    ${json.patterns.join("\n    ")}

## Expected

The text is matched and replaced to be:

    ${json.expected}

## Examples

${specTable}
`;
    fs.writeFileSync(outputFilePath, body, "utf-8");

}

makeDir(path.join(__dirname, "../public/_posts/build/"))
    .then(() => {
        return del([path.join(__dirname, "../public/_posts/build/*.md"), "!.gitkeep"], {
            force: true
        });
    })
    .then(paths => {
        const files = getDictFiles();
        files.forEach((filePath) => {
            const json = loadYaml(filePath);
            if (json === null) {
                return
            }
            const modifiedDate = getModifiedDate(filePath);
            const fileName = moment.utc(modifiedDate).format("YYYY-MM-DD") + "-" + json.id + ".md";
            const markdownOutputFilePath = path.join(__dirname, "../public/_posts/build", `${fileName}`);
            outputMarkdown(filePath, json, markdownOutputFilePath);
        });
    });