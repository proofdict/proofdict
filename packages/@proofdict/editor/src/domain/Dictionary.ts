// MIT © 2017 azu
import { DictionaryPattern } from "./DictionaryPattern";
import { DictionaryExpect } from "./DictionaryExpect";
import { splice } from "@immutable-array/prototype";
import { Entity, Identifier } from "../ddd-base";

export class DictionaryIdentifier extends Identifier<string> {}

export interface DictionaryArgs {
    id: DictionaryIdentifier;
    pattern?: DictionaryPattern;
    expects?: DictionaryExpect[];
}

export class Dictionary extends Entity<DictionaryIdentifier> {
    pattern?: DictionaryPattern;
    expects: DictionaryExpect[];

    constructor(args: DictionaryArgs) {
        super(args.id);
        this.pattern = args.pattern;
        this.expects = args.expects || [];
    }

    inputPattern(pattern: DictionaryPattern) {
        return new Dictionary({
            ...this as Dictionary,
            pattern
        });
    }

    addExpect(expect: DictionaryExpect) {
        return new Dictionary({
            ...this as Dictionary,
            expects: this.expects.concat(expect)
        });
    }

    updateExpect(oldExpect: DictionaryExpect, newExpect: DictionaryExpect) {
        const index = this.expects.findIndex(targetExpect => {
            return targetExpect.equals(oldExpect);
        });
        if (index === -1) {
            return this;
        }
        return new Dictionary({
            ...this as Dictionary,
            expects: splice(this.expects, index, 1, newExpect)
        });
    }

    removeExpect(expect: DictionaryExpect) {
        const index = this.expects.findIndex(targetExpect => {
            return targetExpect.equals(expect);
        });
        if (index === -1) {
            return this;
        }
        return new Dictionary({
            ...this as Dictionary,
            expects: splice(this.expects, index, 1)
        });
    }
}
