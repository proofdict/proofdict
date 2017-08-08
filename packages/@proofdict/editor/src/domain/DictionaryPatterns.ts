// MIT © 2017 azu
import { splice } from "@immutable-array/prototype";
import { DictionaryPattern } from "./DictionaryPattern";
import { Serializer } from "../ddd-base/Serializer";

export const DictionaryPatternsSerializer: Serializer<DictionaryPatterns, DictionaryPatternsJSON> = {
    fromJSON(patternStrings) {
        return new DictionaryPatterns(patternStrings.map(pattern => new DictionaryPattern(pattern)));
    },
    toJSON(entity) {
        return entity.getPatternValuesWithoutEmpty();
    }
};
export type DictionaryPatternsJSON = string[];

/**
 * Collection of Patterns
 */
export class DictionaryPatterns {
    constructor(private patterns: DictionaryPattern[]) {
    }

    // read
    getPatternValues(): string[] {
        return this.patterns.map(pattern => pattern.value);
    }

    getPatternValuesWithoutEmpty(): string[] {
        return this.getPatternValues().filter(pattern => pattern.length > 0);
    }

    // write
    add(pattern: DictionaryPattern) {
        return new DictionaryPatterns(this.patterns.concat(pattern));
    }

    update(oldExpect: DictionaryPattern, newExpect: DictionaryPattern) {
        const index = this.patterns.findIndex(targetPattern => {
            return targetPattern.equals(oldExpect);
        });
        console.log(index);
        if (index === -1) {
            return this;
        }
        const dictionaryPatterns = splice(this.patterns, index, 1, newExpect);
        return new DictionaryPatterns(dictionaryPatterns);
    }

    remove(pattern: DictionaryPattern) {
        const index = this.patterns.findIndex(targetPattern => {
            return targetPattern.equals(pattern);
        });
        if (index === -1) {
            return this;
        }
        return new DictionaryPatterns(splice(this.patterns, index, 1));
    }
}
