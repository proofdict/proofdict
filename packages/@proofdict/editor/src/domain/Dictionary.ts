// MIT © 2017 azu
import { DictionaryExpected } from "./DictionaryExpected";
import { DictionaryPattern } from "./DictionaryPattern";
import { Entity, Identifier } from "../ddd-base";
import { DictionaryPatterns, DictionaryPatternsSerializer } from "./DictionaryPatterns";
import { DictionarySpecs, DictionarySpecsJSON, DictionarySpecsSerializer } from "./DictionarySpecs";
import { DictionarySpec } from "./DictionarySpec";
import { Serializer } from "../ddd-base/Serializer";
import {
    DictionaryWordClasses,
    DictionaryWordClassesJSON,
    DictionaryWordClassesSerializer
} from "./DictionaryWordClasses";

export class DictionaryIdentifier extends Identifier<string> {}

export interface DictionaryJSON {
    id: string;
    expected: string;
    patterns: string[];
    specs: DictionarySpecsJSON;
    wordClasses: DictionaryWordClassesJSON;
}

export interface DictionaryArgs {
    id: DictionaryIdentifier;
    expected: DictionaryExpected;
    patterns: DictionaryPatterns;
    specs: DictionarySpecs;
    wordClasses: DictionaryWordClasses;
}

export const DictionarySerializer: Serializer<Dictionary, DictionaryJSON> = {
    fromJSON(json) {
        return new Dictionary({
            id: new DictionaryIdentifier(json.id),
            expected: new DictionaryExpected(json.expected),
            patterns: DictionaryPatternsSerializer.fromJSON(json.patterns),
            specs: DictionarySpecsSerializer.fromJSON(json.specs),
            wordClasses: DictionaryWordClassesSerializer.fromJSON(json.wordClasses)
        });
    },
    toJSON(dictionary) {
        return {
            id: dictionary.id.toValue(),
            expected: dictionary.expected.value,
            patterns: DictionaryPatternsSerializer.toJSON(dictionary.patterns),
            specs: DictionarySpecsSerializer.toJSON(dictionary.specs),
            wordClasses: DictionaryWordClassesSerializer.toJSON(dictionary.wordClasses)
        };
    }
};

export class Dictionary extends Entity<DictionaryIdentifier> {
    id: DictionaryIdentifier;
    expected: DictionaryExpected;
    patterns: DictionaryPatterns;
    specs: DictionarySpecs;
    wordClasses: DictionaryWordClasses;

    constructor(args: DictionaryArgs) {
        super(args.id);
        this.expected = args.expected;
        this.patterns = args.patterns;
        this.specs = args.specs;
        this.wordClasses = args.wordClasses;
    }

    inputExpected(expected: DictionaryExpected) {
        return new Dictionary({
            ...this as DictionaryArgs,
            expected: expected
        });
    }

    // patterns
    addPattern(pattern: DictionaryPattern) {
        return new Dictionary({
            ...this as DictionaryArgs,
            patterns: this.patterns.add(pattern)
        });
    }

    updatePattern(old: DictionaryPattern, newPattern: DictionaryPattern) {
        return new Dictionary({
            ...this as DictionaryArgs,
            patterns: this.patterns.update(old, newPattern)
        });
    }

    removePattern(pattern: DictionaryPattern) {
        return new Dictionary({
            ...this as DictionaryArgs,
            patterns: this.patterns.remove(pattern)
        });
    }

    // specs
    addSpec(spec: DictionarySpec) {
        return new Dictionary({
            ...this as DictionaryArgs,
            specs: this.specs.add(spec)
        });
    }

    updateSpec(oldSpec: DictionarySpec, newSpec: DictionarySpec) {
        return new Dictionary({
            ...this as DictionaryArgs,
            specs: this.specs.update(oldSpec, newSpec)
        });
    }

    removeSpec(spec: DictionarySpec) {
        return new Dictionary({
            ...this as DictionaryArgs,
            specs: this.specs.remove(spec)
        });
    }

    updateSpecs(newSpecs: DictionarySpecs) {
        return new Dictionary({
            ...this as DictionaryArgs,
            specs: newSpecs
        });
    }

    updateWordClasses(wordClasses: DictionaryWordClasses) {
        return new Dictionary({
            ...this as DictionaryArgs,
            wordClasses
        });
    }
}
