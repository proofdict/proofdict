#!/usr/bin/env node

const meow = require("meow");
const run = require("../lib/cli.js").run;

const cli = meow(
    `
    Usage
      $ prh-to-proofdict <input>
 
    Options
      --outDir -o output directory
      --defaultTag  add tags to dictionary
 
    Examples
      $ prh-to-proofdict ./prh.yml --outDir ./_data/proofdict/
`,
    {
        flags: {
            outDir: {
                type: "string",
                alias: "o",
            },
            defaultTags: {
                type: "string",
            },
        },
        autoVersion: true,
        autoHelp: true,
    }
);
// main
run(cli.input, {
    cwd: process.cwd(),
    outputDirectory: cli.flags.outDir,
    defaultTags: cli.flags.defaultTags ? cli.flags.defaultTags.split(",").map((tag) => tag.trim()) : [],
})
    .then(() => {
        console.log("Success migrations!");
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
