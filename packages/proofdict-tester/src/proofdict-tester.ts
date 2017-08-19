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
    details: ProofdictTesterResultDetail[]
    // This will be removed in the future
    // @deprecated
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
            results.push({
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