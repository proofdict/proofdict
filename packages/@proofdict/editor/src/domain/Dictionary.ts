// MIT © 2017 azu
import { DictionaryExpect } from "./DictionaryExpect";
import { DictionaryPattern } from "./DictionaryPattern";
import { Entity, Identifier } from "../ddd-base";
import { DictionaryPatterns } from "./DictionaryPatterns";

export class DictionaryIdentifier extends Identifier<string> {}

export interface DictionaryArgs {
    id: DictionaryIdentifier;
    expect: DictionaryExpect;
    patterns: DictionaryPatterns;
}

export class Dictionary extends Entity<DictionaryIdentifier> {
    expect: DictionaryExpect;
    patterns: DictionaryPatterns;

    constructor(args: DictionaryArgs) {
        super(args.id);
        this.expect = args.expect;
        this.patterns = args.patterns;
    }

    inputExpect(expect: DictionaryExpect) {
        return new Dictionary({
            ...this as Dictionary,
            expect
        });
    }

    addPattern(pattern: DictionaryPattern) {
        return new Dictionary({
            ...this as Dictionary,
            patterns: this.patterns.add(pattern)
        });
    }

    updatePattern(oldExpect: DictionaryPattern, newExpect: DictionaryPattern) {
        return new Dictionary({
            ...this as Dictionary,
            patterns: this.patterns.update(oldExpect, newExpect)
        });
    }

    removePattern(pattern: DictionaryPattern) {
        return new Dictionary({
            ...this as Dictionary,
            patterns: this.patterns.remove(pattern)
        });
    }
}
