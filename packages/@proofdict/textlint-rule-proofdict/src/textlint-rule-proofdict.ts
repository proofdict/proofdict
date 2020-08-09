// MIT © 2017 azu
"use strict";
import { RuleOption, RuleOptions } from "./RuleOptions";
import { createTester } from "./create-tester";
import { fetchProofdict } from "./fetch-proofdict";
import { getDictJSONURL, getRuleURL } from "./proofdict-repo-util";
import { MODE } from "./mode";
import { openStorage } from "./dictionary-storage";
import { TxtNode } from "@textlint/ast-node-types";
import { TextlintRuleModule } from "@textlint/types";
import { getDictionary } from "./fetch-dictionary";

const { RuleHelper } = require("textlint-rule-helper");

const debug = require("debug")("textlint-rule-proofdict");

const DefaultOptions: RuleOption = {
    // If you want to use live-proofdict
    // Proofdict-style dictionary URL
    // Example: "https://example.github.io/proof-dictionary/"
    // If you want to specific JSON end point, please pass
    // `dictURL; { jsonAPI: string, ruleBase: string }`
    dictURL: undefined,
    // If you want to use local proofdict
    // dictPath is glob style path
    // "./dict/*.yml"
    dictGlob: undefined,
    // Default: 60sec(60 * 1000ms)
    autoUpdateInterval: 60 * 1000,
    // = Tag settings
    // Filter dictionary by allow or deny
    // Default: Enable all terms of the dictionary.
    // When set both options, this rule prefer allowTags to denyTags
    allowTags: [],
    denyTags: [],
    // For testing
    // set you proofdict json object
    proofdict: undefined,
    // Disable cache for tester
    disableProofdictTesterCache: false,
};

/**
 * Refresh Dictionary
 * @param options
 */
const refreshDictionary = async (options: RuleOption) => {
    const mode = options.dictURL ? MODE.NETWORK : MODE.LOCAL;
    const autoUpdateInterval =
        options.autoUpdateInterval !== undefined ? options.autoUpdateInterval : DefaultOptions.autoUpdateInterval;
    const storage = await openStorage();
    // default: 0
    const lastUpdated = (await storage.get("proofdict-lastUpdated")) ?? -1;
    const isExpired = lastUpdated <= 0 ? true : Date.now() - lastUpdated > autoUpdateInterval;
    if (mode === MODE.NETWORK && isExpired) {
        const jsonAPIURL = getDictJSONURL(options);
        return fetchProofdict({ URL: jsonAPIURL })
            .then((dictionary) => {
                storage.set("proofdict", dictionary);
                storage.set("proofdict-lastUpdated", Date.now());
            })
            .catch((error) => {
                debug("error is happened, but this rule fallback to storage", error);
            });
    } else {
        return Promise.resolve();
    }
};
const reporter: TextlintRuleModule<RuleOptions> = (context, options = DefaultOptions) => {
    const helper = new RuleHelper(context);
    const { Syntax, RuleError, report, getSource, fixer } = context;
    const dictOptions = Array.isArray(options.dicts) ? options.dicts : [options];
    const targetNodes: TxtNode[] = [];
    const addNodeToQueue = (node: TxtNode) => targetNodes.push(node);
    return {
        [Syntax.Str](node) {
            addNodeToQueue(node);
        },
        async [Syntax.DocumentExit](node) {
            const storage = await openStorage();
            const dictResultPromise = dictOptions.map((options) => {
                // Error if wrong config
                if (!options.dictURL && !options.dictGlob && !options.proofdict) {
                    report(
                        node,
                        new RuleError(`Not found dictionary in Config.
Please set dictURL or dictPath to .textlintrc.`)
                    );
                }
                const mode = options.dictURL ? MODE.NETWORK : MODE.LOCAL;
                const allowTags = Array.isArray(options.allowTags) ? options.allowTags : DefaultOptions.allowTags;
                const denyTags = Array.isArray(options.denyTags) ? options.denyTags : DefaultOptions.denyTags;
                const disableTesterCache =
                    options.disableProofdictTesterCache !== undefined
                        ? options.disableProofdictTesterCache
                        : DefaultOptions.disableProofdictTesterCache;
                return refreshDictionary(options).then(async () => {
                    const dictionary = await getDictionary(options, mode);
                    if (!dictionary) {
                        debug("Can not fetch rules from local and network. stop to lint.");
                        return [];
                    }
                    const value = await storage.get("proofdict-lastUpdated");
                    const lastUpdated = value ?? 0;
                    const tester = createTester({
                        dictionary,
                        lastUpdated,
                        allowTags: allowTags,
                        denyTags: denyTags,
                        disableTesterCache,
                    });
                    // check
                    const promises = targetNodes.map((node) => {
                        if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
                            return;
                        }
                        const text = getSource(node);
                        return tester.match(text).then((result) => {
                            result.details.forEach((detail) => {
                                const { matchStartIndex, matchEndIndex, actual, expected, description, rule } = detail;
                                // If result is not changed, should not report
                                if (actual === expected) {
                                    return;
                                }
                                const url = getRuleURL(options, rule);
                                const additionalDescription = description ? `\n${description}` : "";
                                const additionalReference = url ? `\nSee ${url}` : "";
                                const messages =
                                    actual + " => " + expected + additionalDescription + additionalReference;
                                report(
                                    node,
                                    new RuleError(messages, {
                                        index: matchStartIndex,
                                        fix: fixer.replaceTextRange([matchStartIndex, matchEndIndex], expected),
                                    })
                                );
                            });
                        });
                    });
                    return Promise.all(promises);
                });
            });
            return Promise.all(dictResultPromise);
        },
    };
};

export default {
    linter: reporter,
    fixer: reporter,
};
