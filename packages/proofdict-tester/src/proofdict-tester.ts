// MIT © 2017 azu
import { Diff, Engine } from "prh";
import {
    wrapHyphenWordBoundary, wrapWordBoundary
} from "./proofdict-tester-util";
import { parseRegExpString } from "prh/lib/utils/regexp";

export interface Proofdict {
    expected: string;
    patterns: string[];
    description: string;
    id: string;
    specs: ProofdictSpec[];
    tags: string[];
}

export interface ProofdictSpec {
    from: string;
    to: string;
}

export interface ProofdictTesterResultDetail {
    description?: string;
    matchStartIndex: number;
    matchEndIndex: number;
    actual: string;
    expected: string;
}

export interface ProofdictTesterResult {
    // replaced result
    output: string;
    details: ProofdictTesterResultDetail[]
    diffs: Diff[];
}

const NOUN_TAG = "noun";

export class ProofdictTester {
    private prhEngine: Engine;

    constructor(private proofdictData: Proofdict[]) {
        this.proofdictData = proofdictData;
        this.prhEngine = new Engine({
            version: 1,
            rules: proofdictData.map(dict => {
                const isNoun = dict.tags.indexOf(NOUN_TAG) !== -1;
                return {
                    expected: dict.expected,
                    patterns: isNoun ? dict.patterns.map(pattern => {
                        const regExp = parseRegExpString(pattern);
                        if (regExp === null) {
                            return pattern;
                        }
                        return wrapWordBoundary(regExp).toString();
                    }) : dict.patterns,
                    tags: dict.tags
                }
            })
        });
    }

    replace(text: string): Promise<string> {
        return this.match(text).then(result => result.output);
    }

    match(text: string): Promise<ProofdictTesterResult> {
        // TODO: prh type is wrong?
        const changeSet = this.prhEngine.makeChangeSet(<any> null, text);
        const sortedDiffs = changeSet.diffs.sort(function (a, b) {
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
            const tags: string[] = diff.rule!.raw.tags;
            if (tags.indexOf(NOUN_TAG) !== -1) {
                const expectPatterns = wrapHyphenWordBoundary(diff.pattern);
                const isExpected = expectPatterns.some(expectPattern => {
                    return expectPattern.test(currentString);
                });
                if (isExpected) {
                    return;
                }
            }
            const result = diff.expected.replace(/\$([0-9]{1,2})/g, function (match, g1) {
                const index = parseInt(g1, 10);
                if (index === 0 || (diff.matches.length - 1) < index) {
                    return match;
                }
                return diff.matches[index] || "";
            });
            // matchStartIndex/matchEndIndex value is original position, not replaced position
            // textlint use original position
            const matchStartIndex = diff.index;
            const matchEndIndex = matchStartIndex + diff.matches[0].length;
            // actual => expected
            const actual = currentString.slice(diff.index + deltaTestStartPosition, diff.index + deltaTestStartPosition + diff.matches[0].length);
            const description = diff.rule && diff.rule.raw.description;
            // forward delta
            currentString = currentString.slice(0, diff.index + deltaTestStartPosition) + result + currentString.slice(diff.index + deltaTestStartPosition + diff.matches[0].length);
            deltaTestStartPosition += result.length - diff.matches[0].length;
            results.push({
                matchStartIndex,
                matchEndIndex,
                actual,
                expected: result,
                description
            });
        });
        return Promise.resolve({
            output: currentString,
            details: results,
            diffs: sortedDiffs
        });
    }
}