#!/usr/bin/env node
"use strict";
const meow = require("meow");
const execute = require("../lib/cli").execute;
const cli = meow(
    `
    Usage
      $ proofdict-tester [path|glob]

    Examples
      $ proofdict-tester "dict/*.yml"
`
);

execute(cli.input)
    .then(message => {
        console.log(message);
    })
    .catch(error => {
        console.error(error);
    });
