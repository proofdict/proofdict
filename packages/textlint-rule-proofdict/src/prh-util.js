// MIT © 2017 azu
"use strict";
/**
 * for each diff of changeSet
 * @param {ChangeSet} changeSet
 * @param {string} str
 * @param {function({
            matchStartIndex: number,
            matchEndIndex: number,
            actual: string
            expected: string
        })}onChangeOfMatch
 */
export const forEachChange = (changeSet, str, onChangeOfMatch) => {
    const sortedDiffs = changeSet.diffs.sort(function(a, b) {
        return a.index - b.index;
    });
    let delta = 0;
    sortedDiffs.forEach(function(diff) {
        const result = diff.expected.replace(/\$([0-9]{1,2})/g, function(match, g1) {
            const index = parseInt(g1);
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
        const actual = str.slice(diff.index + delta, diff.index + delta + diff.matches[0].length);
        const description = diff.rule.raw.description;
        onChangeOfMatch({
            matchStartIndex,
            matchEndIndex,
            actual: actual,
            expected: result,
            description: description
        });
        str = str.slice(0, diff.index + delta) + result + str.slice(diff.index + delta + diff.matches[0].length);
        delta += result.length - diff.matches[0].length;
    });
};