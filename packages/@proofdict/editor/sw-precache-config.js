// MIT © 2017 azu
"use strict";
module.exports = {
    maximumFileSizeToCacheInBytes: 6097152,
    staticFileGlobs: [
        'build/index.html',
        'build/static/**/*.{js,css}',
        'build/dict/*.dat.gz'
    ],
    stripPrefix: 'build/'
};