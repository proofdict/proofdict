// MIT © 2017 azu
"use strict";
const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");
const getDictFiles = require("./get-dict-files").getDictFiles;
const outputPath = path.join(__dirname, "../public/dict.json");
const loadYaml = (filePath) => {
    try {
        return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error(error);
        return null
    }
};

const createDictionary = () => {
    const dictionary = [];
    getDictFiles().forEach(filePath => {
        const json = loadYaml(filePath);
        if (json === null) {
            return;
        }
        dictionary.push(json);
    });
    return dictionary;
};
// write dict.json
if (!module.parent) {
    console.log("Write", outputPath);
    fs.writeFileSync(outputPath, JSON.stringify(createDictionary(), null, 4), "utf-8");
}

module.exports.createDictionary = createDictionary;