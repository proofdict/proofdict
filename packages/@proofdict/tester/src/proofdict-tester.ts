// MIT © 2017 azu
import { Diff, Engine } from "prh";
import { wrapHyphenWordBoundary, wrapWordBoundaryToString } from "./proofdict-tester-util";
import { filterByTags, isNoun } from "./TagFilter";

export type Proofdict = ProofdictRule[];

export interface ProofdictRule {
    id?: string;
    description?: string;
    expected: string;
    patterns: string[];
    tags: string[];
    specs?: ProofdictSpec[];

    [index: string]: any;
}

export interface ProofdictSpec {
    from: string;
    to: string;
}

export interface ProofdictTesterResultDetail {
    // It is matched rule object
    rule: ProofdictRule;
    // additional description
    description?: string;
    // original match start index, not replaced start index
    matchStartIndex: number;
    // original match end index, not replaced start index
    matchEndIndex: number;
    // match text
    actual: string;
    // replace text for actual
    expected: string;
}

export interface ProofdictTesterResult {
    // replaced result
    output: string;
    // details output
    details: ProofdictTesterResultDetail[];
    // This will be removed in the future
    // @deprecated
    diffs?: Diff[];
}

export interface ProofdictTesterOptions {
    dictionary: Proofdict;
    // Filter dictionary by whitelist or blacklist
    // Default: Enable all terms of the dictionary.
    // When set both options, this rule prefer whitelist to blacklist
    whitelistTags?: string[];
    blacklistTags?: string[];
}

export class ProofdictTester {
    private prhEngine: Engine;
    private proofdict: Proofdict;

    constructor(options: ProofdictTesterOptions) {
        this.proofdict = options.dictionary;
        const filteredProofdict = filterByTags(this.proofdict, options.whitelistTags, options.blacklistTags);
        this.prhEngine = new Engine({
            version: 1,
            rules: filteredProofdict.map(dict => {
                return {
                    id: dict.id,
                    expected: dict.expected,
                    patterns: isNoun(dict)
                        ? dict.patterns.map(pattern => {
                              return wrapWordBoundaryToString(pattern);
                          })
                        : dict.patterns,
                    tags: dict.tags,
                    description: dict.description
                };
            })
        });
    }

    replace(text: string): Promise<string> {
        return this.match(text).then(result => result.output);
    }

    match(text: string): Promise<ProofdictTesterResult> {
        // pass empty string for working in browser
        // https://github.com/prh/prh/issues/29
        const changeSet = this.prhEngine.makeChangeSet("", text);
        const sortedDiffs = changeSet.diffs.sort(function(a, b) {
            return a.index - b.index;
        });
        let deltaTestStartPosition = 0;
        let currentString = text;
        const results: ProofdictTesterResultDetail[] = [];
        sortedDiffs.forEach(diff => {
            if (!diff.expected) {
                return;
            }
            // Extension: "noun"
            // Automatically add word boundary to the patterns
            if (isNoun(diff.rule!.raw)) {
                const expectPatterns = wrapHyphenWordBoundary(diff.pattern);
                const isExpected = expectPatterns.some(expectPattern => {
                    return expectPattern.test(currentString);
                });
                if (isExpected) {
                    return;
                }
            }
            const applied = diff.apply(currentString, deltaTestStartPosition);
            if (applied == null) {
                return;
            }
            // matchStartIndex/matchEndIndex value is original position, not replaced position
            // textlint use original position
            const matchStartIndex = diff.index;
            const matchEndIndex = matchStartIndex + diff.matches[0].length;
            const actual = currentString.slice(matchStartIndex, matchEndIndex);
            const expected = diff.newText!;
            const description = diff.rule && diff.rule.raw.description;
            const rule = diff.rule && diff.rule.raw;
            results.push({
                rule,
                matchStartIndex,
                matchEndIndex,
                actual,
                expected,
                description
            });
            currentString = applied.replaced;
            deltaTestStartPosition = applied.newDelta;
        });
        return Promise.resolve({
            output: currentString,
            details: results,
            diffs: sortedDiffs
        });
    }
}
