// MIT © 2017 azu
"use strict";
import { forEachChange } from "./prh-util";

const { getProofdict, fetchProofdict, } = require("proofdict");
const { createLocalStorage } = require("localstorage-ponyfill");
const { RuleHelper } = require("textlint-rule-helper");
const { Engine } = require("prh");
const DefaultOptions = {
    // = AutoUpdate settings
    // Automatically update proofdict source
    autoUpdate: false,
    // 60sec(60 * 1000ms) by default
    autoUpdateInterval: 60 * 1000,
    // If autoUpdate is failed, redirect to use cached proofdict
    autoFallback: false,
    // = Tag settings
};
const reporter = (context, options = DefaultOptions) => {
    const helper = new RuleHelper(context);
    const { Syntax, RuleError, report, getSource, fixer } = context;
    const autoUpdate = options.autoUpdate !== undefined ? options.autoUpdate : DefaultOptions.autoUpdate;
    const autoFallback = options.autoFallback !== undefined ? options.autoFallback : DefaultOptions.autoFallback;
    const autoUpdateInterval = options.autoUpdateInterval !== undefined ? options.autoUpdateInterval
        : DefaultOptions.autoUpdateInterval;
    const localStorage = autoUpdate ? createLocalStorage() : createLocalStorage({ mode: "memory" });
    const defaultDictionary = getProofdict();
    const targetNodes = [];
    const addQueue = (node) => targetNodes.push(node);
    let promiseQueue = null;
    return {
        [Syntax.Document]() {
            // default: 0
            const lastUpdated = Number(localStorage.getItem("proofdict-lastUpdated", "0"));
            const isExpired = (lastUpdated + autoUpdateInterval) < Date.now();
            if (autoUpdate && isExpired) {
                promiseQueue = fetchProofdict().then(dictionary => {
                    localStorage.setItem("proofdict", JSON.stringify(dictionary));
                    localStorage.setItem("proofdict-lastUpdated", Date.now());
                }).catch(error => {
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
                const dictionary = prrofDictData ? JSON.parse(prrofDictData) : defaultDictionary;
                const prh = new Engine({
                    version: 1,
                    rules: dictionary.map(json => {
                        return {
                            description: json.description.length > 0 ? json.description : undefined,
                            expected: json.expected,
                            patterns: json.patterns
                        }
                    }),
                });

                // check
                targetNodes.forEach(node => {
                    if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
                        return;
                    }
                    const text = getSource(node);
                    // to get position from index
                    const makeChangeSet = prh.makeChangeSet(null, text);
                    forEachChange(makeChangeSet, text, ({ matchStartIndex, matchEndIndex, actual, expected, description }) => {
                        // If result is not changed, should not report
                        if (actual === expected) {
                            return;
                        }
                        const messages = actual + " => " + expected + (description ? `\n${description}` : "");
                        report(node, new RuleError(messages, {
                            index: matchStartIndex,
                            fix: fixer.replaceTextRange([matchStartIndex, matchEndIndex], expected)
                        }));
                    });
                })
            });
        },
    }
};
module.exports = {
    linter: reporter,
    fixer: reporter
};