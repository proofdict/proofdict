// MIT © 2018 azu
"use strict";
import urlJoin from "url-join";
import { RuleOption } from "./RuleOptions";

/**
 * @param options
 * @returns {string}
 */
export function getDictJSONURL(options: RuleOption) {
    if (
        typeof options.dictURL === "object" &&
        typeof options.dictURL.jsonAPI === "string" &&
        typeof options.dictURL.ruleBase === "string"
    ) {
        return options.dictURL.jsonAPI;
    }
    if (typeof options.dictURL === "string") {
        return urlJoin(options.dictURL, "dictionary.json");
    }
    throw new Error("options.dictURL is undefined");
}

/**
 * @param options
 * @param rule
 * @returns {string|undefined}
 */
export function getRuleURL(options: RuleOption, rule: any) {
    if (!rule) {
        return;
    }
    // http://custom.example.com/base#id
    if (typeof options.dictURL === "object" && typeof options.dictURL.ruleBase === "string") {
        return `${options.dictURL.ruleBase}#${encodeURIComponent(rule.id)}`;
    }
    // http://example.com#id
    if (options.dictURL) {
        return `${options.dictURL}#${encodeURIComponent(rule.id)}`;
    }
    return;
}
