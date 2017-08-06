// MIT © 2017 azu
import { DictionaryExpect } from "./DictionaryExpect";
import { DictionaryPattern } from "./DictionaryPattern";
import { Entity, Identifier } from "../ddd-base";
import { DictionaryPatterns } from "./DictionaryPatterns";
import { DictionarySpecs } from "./DictionarySpecs";
import { DictionarySpec } from "./DictionarySpec";

export class DictionaryIdentifier extends Identifier<string> {}

export interface DictionaryArgs {
    id: DictionaryIdentifier;
    expect: DictionaryExpect;
    patterns: DictionaryPatterns;
    specs: DictionarySpecs;
}

export class Dictionary extends Entity<DictionaryIdentifier> {
    expect: DictionaryExpect;
    patterns: DictionaryPatterns;
    specs: DictionarySpecs;

    constructor(args: DictionaryArgs) {
        super(args.id);
        this.expect = args.expect;
        this.patterns = args.patterns;
        this.specs = args.specs;
    }

    inputExpect(expect: DictionaryExpect) {
        return new Dictionary({
            ...this as Dictionary,
            expect
        });
    }

    // patterns
    addPattern(pattern: DictionaryPattern) {
        return new Dictionary({
            ...this as Dictionary,
            patterns: this.patterns.add(pattern)
        });
    }

    updatePattern(old: DictionaryPattern, newPattern: DictionaryPattern) {
        return new Dictionary({
            ...this as Dictionary,
            patterns: this.patterns.update(old, newPattern)
        });
    }

    removePattern(pattern: DictionaryPattern) {
        return new Dictionary({
            ...this as Dictionary,
            patterns: this.patterns.remove(pattern)
        });
    }
    // specs
    addSpec(spec: DictionarySpec) {
        return new Dictionary({
            ...this as Dictionary,
            specs: this.specs.add(spec)
        });
    }

    updateSpec(oldSpec: DictionarySpec, newSpec: DictionarySpec) {
        return new Dictionary({
            ...this as Dictionary,
            specs: this.specs.update(oldSpec, newSpec)
        });
    }

    removeSpec(spec: DictionarySpec) {
        return new Dictionary({
            ...this as Dictionary,
            specs: this.specs.remove(spec)
        });
    }

    updateSpecList(newSpecs: DictionarySpec[]) {
        return new Dictionary({
            ...this as Dictionary,
            specs: new DictionarySpecs(newSpecs)
        });
    }
}
