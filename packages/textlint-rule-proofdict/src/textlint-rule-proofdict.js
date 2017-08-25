// MIT © 2017 azu
"use strict";

const { getProofdict, fetchProofdict } = require("proofdict");
const { createLocalStorage } = require("localstorage-ponyfill");
const { RuleHelper } = require("textlint-rule-helper");
import { createTester } from "./create-tester";

const DefaultOptions = {
    // = AutoUpdate settings
    // Automatically update proofdict source
    "autoUpdate": false,
    // 60sec(60 * 1000ms) by default
    "autoUpdateInterval": 60 * 1000,
    // If autoUpdate is failed, redirect to use cached proofdict
    "autoFallback": false,
    // = Tag settings
    // Filter dictionary by whitelist or blacklist
    // Default: Enable all terms of the dictionary.
    // When set both options, this rule prefer whitelist to blacklist
    "whitelistTags": [],
    "blacklistTags": [],
    // For testing
    // set you proofdict json object
    "proofdict": undefined
};
const reporter = (context, options = DefaultOptions) => {
    const helper = new RuleHelper(context);
    const { Syntax, RuleError, report, getSource, fixer } = context;
    const customProofdict = options.proofdict !== undefined ? options.proofdict : DefaultOptions.proofdict;
    const autoUpdate = options.autoUpdate !== undefined ? options.autoUpdate : DefaultOptions.autoUpdate;
    const autoFallback = options.autoFallback !== undefined ? options.autoFallback : DefaultOptions.autoFallback;
    const autoUpdateInterval = options.autoUpdateInterval !== undefined
        ? options.autoUpdateInterval
        : DefaultOptions.autoUpdateInterval;
    const localStorage = autoUpdate ? createLocalStorage() : createLocalStorage({ mode: "memory" });
    const defaultDictionary = getProofdict();
    const targetNodes = [];
    const addQueue = node => targetNodes.push(node);
    let promiseQueue = null;
    return {
        [Syntax.Document]() {
            // default: 0
            const lastUpdated = Number(localStorage.getItem("proofdict-lastUpdated", "0"));
            const isExpired = lastUpdated + autoUpdateInterval < Date.now();
            if (autoUpdate && isExpired) {
                promiseQueue = fetchProofdict()
                    .then(dictionary => {
                        localStorage.setItem("proofdict", JSON.stringify(dictionary));
                        localStorage.setItem("proofdict-lastUpdated", Date.now());
                    })
                    .catch(error => {
                        // autoFallback is disabled, re-throw error
                        if (!autoFallback) {
                            return Promise.reject(error);
                        }
                    });
            } else {
                promiseQueue = Promise.resolve();
            }
            return promiseQueue;
        },
        [Syntax.Str](node) {
            addQueue(node);
        },
        [`${Syntax.Document}:exit`]() {
            return promiseQueue.then(() => {
                const prrofDictData = localStorage.getItem("proofdict");
                const loadedDictionary = prrofDictData ? JSON.parse(prrofDictData) : defaultDictionary;
                const proofdict = customProofdict ? customProofdict : loadedDictionary;
                const lastUpdated = Number(localStorage.getItem("proofdict-lastUpdated", "0"));
                const tester = createTester(lastUpdated, proofdict);
                // check
                const promises = targetNodes.map(node => {
                    if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
                        return;
                    }
                    const text = getSource(node);
                    return tester.match(text).then(result => {
                        result.details.forEach(detail => {
                            const { matchStartIndex, matchEndIndex, actual, expected, description, url } = detail;
                            // If result is not changed, should not report
                            if (actual === expected) {
                                return;
                            }
                            const additionalDescription = description ? `\n${description}` : "";
                            const messages = actual + " => " + expected + additionalDescription + `\nSee ${url}`;
                            report(
                                node,
                                new RuleError(messages, {
                                    index: matchStartIndex,
                                    fix: fixer.replaceTextRange([matchStartIndex, matchEndIndex], expected)
                                })
                            );
                        });
                    });
                });
                return Promise.all(promises);
            });
        }
    };
};
module.exports = {
    linter: reporter,
    fixer: reporter
};
