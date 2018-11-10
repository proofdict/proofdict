import { ProofdictRule } from "@proofdict/types";
import { createCombinationPatterns } from "./proofdict-tester-util";

const SPECIAL_PATTERNS = [
    {
        placeholder: "{{COMBINATION_WORD}}",
        handler: (patterns: string[]): RegExp[] => {
            if (patterns.length === 0) {
                return [];
            }
            return patterns.reduce(
                (total, pattern) => {
                    return total.concat(createCombinationPatterns(pattern));
                },
                [] as RegExp[]
            );
        }
    }
];

const findSpecialPattern = (pattern: string) => {
    for (let i = 0; i < SPECIAL_PATTERNS.length; i++) {
        const SPECIAL_PATTERN = SPECIAL_PATTERNS[i];
        if (SPECIAL_PATTERN.placeholder === pattern) {
            return SPECIAL_PATTERN;
        }
    }
    return;
};

export class AllowPattern {
    private patterns: RegExp[];

    constructor(allow: string, patterns: string[]) {
        const specialPattern = findSpecialPattern(allow);
        this.patterns = specialPattern ? specialPattern.handler(patterns) : [new RegExp(allow)];
    }

    match(text: string) {
        return this.patterns.some(pattern => {
            return pattern.test(text);
        });
    }
}

export class AllowPatterns {
    private allowPatterns: AllowPattern[];

    constructor(dict: ProofdictRule) {
        const allows = dict.allows || [];
        const patterns = dict.patterns;
        this.allowPatterns = allows.map(allowString => new AllowPattern(allowString, patterns));
    }

    match(text: string) {
        return this.allowPatterns.some(allowPattern => allowPattern.match(text));
    }
}
