// MIT © 2017 azu
import { DictionaryExpect } from "./DictionaryExpect";
import { DictionaryPattern } from "./DictionaryPattern";
import { splice } from "@immutable-array/prototype";
import { Entity, Identifier } from "../ddd-base";

export class DictionaryIdentifier extends Identifier<string> {}

export interface DictionaryArgs {
    id: DictionaryIdentifier;
    expect?: DictionaryExpect;
    patterns?: DictionaryPattern[];
}

export class Dictionary extends Entity<DictionaryIdentifier> {
    expect?: DictionaryExpect;
    patterns: DictionaryPattern[];

    constructor(args: DictionaryArgs) {
        super(args.id);
        this.expect = args.expect;
        this.patterns = args.patterns || [];
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
            patterns: this.patterns.concat(pattern)
        });
    }

    updatePattern(oldExpect: DictionaryPattern, newExpect: DictionaryPattern) {
        const index = this.patterns.findIndex(targetPattern => {
            return targetPattern.equals(oldExpect);
        });
        if (index === -1) {
            return this;
        }
        return new Dictionary({
            ...this as Dictionary,
            patterns: splice(this.patterns, index, 1, newExpect)
        });
    }

    removePattern(pattern: DictionaryPattern) {
        const index = this.patterns.findIndex(targetPattern => {
            return targetPattern.equals(pattern);
        });
        if (index === -1) {
            return this;
        }
        return new Dictionary({
            ...this as Dictionary,
            patterns: splice(this.patterns, index, 1)
        });
    }
}
