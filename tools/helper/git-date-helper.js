// MIT © 2017 azu
"use strict";
const execSync = require('child_process').execSync;
// http://stackoverflow.com/questions/2390199/finding-the-date-time-a-file-was-first-added-to-a-git-repository
module.exports.getModifiedDate = function getModifiedDate(filePath) {
    try {
        if (filePath === null) {
            return new Date();
        }
        const log = execSync("git log --follow --format=%aD -1 -- '" + filePath + "'");
        if (log === null || log === undefined || Buffer.isBuffer(log)) {
            return new Date();
        }
        return new Date(log);
    } catch (e) {
        return new Date();
    }
};

module.exports.getCreateDate = function getCreateDate(filePath) {
    if (filePath === null) {
        return new Date();
    }
    try {
        const log = execSync("git log --diff-filter=A --follow --format=%aD -1 -- '" + filePath + "'");
        if (log === null || log === undefined || Buffer.isBuffer(log)) {
            return new Date();
        }
        return new Date(log);
    } catch (e) {
        return new Date();
    }
};