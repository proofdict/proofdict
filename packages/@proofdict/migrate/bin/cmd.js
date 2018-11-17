#!/usr/bin/env node
const meow = require("meow");
const glob = require("glob");
const runMigrate = require("../lib/cli").runMigrate;
const migrationNames = require("../lib/cli").migrationNames;
const cli = meow(
    `
    Usage
      $ npx @proofdict/migrate "proof-dictionary/**/*.yaml" [options]

    Options:
      --script migration script name 
    Scripts:
      ${migrationNames.map(name => `- ${name}`).join("\n")}

    Examples
      $ npx @proofdict/migrate "proof-dictionary/**/*.yaml" --script noun-to-allows
`,
    {
        flags: {
            script: {
                type: "string"
            }
        },
        autoVersion: true,
        autoHelp: true
    }
);

const filePathList = glob.sync(cli.input[0]);
const scriptName = cli.flags.script;
runMigrate(filePathList, scriptName);
