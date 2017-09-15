// MIT © 2017 azu
"use strict";
const path = require("path");
const globby = require("globby");
const getDictFiles = () => {
    const dictDir = path.join(__dirname, "../dict");
    return globby.sync(dictDir + "/*.yml");
};
module.exports.getDictFiles = getDictFiles;
