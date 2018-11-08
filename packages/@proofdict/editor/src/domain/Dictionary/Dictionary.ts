// MIT © 2017 azu
import { DictionaryExpected } from "./DictionaryExpected";
import { DictionaryPattern } from "./DictionaryPattern";
import { Entity, Identifier } from "ddd-base";
import { DictionaryPatterns, DictionaryPatternsSerializer } from "./DictionaryPatterns";
import { DictionarySpecs, DictionarySpecsJSON, DictionarySpecsSerializer } from "./DictionarySpecs";
import { DictionarySpec } from "./DictionarySpec";
import { Serializer } from "ddd-base";
import {
    DictionaryWordClasses,
    DictionaryWordClassesJSON,
    DictionaryWordClassesSerializer
} from "./DictionaryWordClasses";
import { DictionaryDescription } from "./DictionaryDescription";
import { DictionaryTags, DictionaryTagsJSON, DictionaryTagsSerializer } from "./DictionaryTags";

export class DictionaryIdentifier extends Identifier<string> {}

export interface DictionaryJSON {
    id: string;
    description: string;
    expected: string;
    patterns: string[];
    specs: DictionarySpecsJSON;
    tags: DictionaryTagsJSON;
    wordClasses?: DictionaryWordClassesJSON;
}

export interface DictionaryProps {
    id: DictionaryIdentifier;
    description: DictionaryDescription;
    expected: DictionaryExpected;
    patterns: DictionaryPatterns;
    specs: DictionarySpecs;
    tags: DictionaryTags;
    wordClasses?: DictionaryWordClasses;
}

export const DictionarySerializer: Serializer<Dictionary, DictionaryJSON> = {
    fromJSON(json) {
        return new Dictionary({
            id: new DictionaryIdentifier(json.id),
            description: new DictionaryDescription(json.description || ""),
            expected: new DictionaryExpected(json.expected),
            patterns: DictionaryPatternsSerializer.fromJSON(json.patterns),
            specs: DictionarySpecsSerializer.fromJSON(json.specs),
            tags: DictionaryTagsSerializer.fromJSON(json.tags),
            wordClasses: json.wordClasses ? DictionaryWordClassesSerializer.fromJSON(json.wordClasses) : undefined
        });
    },
    toJSON(dictionary) {
        const optional =
            dictionary.wordClasses && dictionary.wordClasses.hasWordClass
                ? {
                      wordClasses: DictionaryWordClassesSerializer.toJSON(dictionary.wordClasses)
                  }
                : {};
        return {
            ...optional,
            id: dictionary.id.toValue(),
            description: dictionary.description.value,
            expected: dictionary.expected.value,
            patterns: DictionaryPatternsSerializer.toJSON(dictionary.patterns),
            specs: DictionarySpecsSerializer.toJSON(dictionary.specs),
            tags: DictionaryTagsSerializer.toJSON(dictionary.tags)
        };
    }
};

export class Dictionary extends Entity<DictionaryProps> {
    id: DictionaryIdentifier;
    description: DictionaryDescription;
    expected: DictionaryExpected;
    patterns: DictionaryPatterns;
    specs: DictionarySpecs;
    tags: DictionaryTags;
    wordClasses?: DictionaryWordClasses;

    constructor(props: DictionaryProps) {
        super(props);
        this.id = props.id;
        this.description = props.description;
        this.expected = props.expected;
        this.patterns = props.patterns;
        this.specs = props.specs;
        this.tags = props.tags;
        this.wordClasses = props.wordClasses;
    }

    inputExpected(expected: DictionaryExpected) {
        return new Dictionary({
            ...(this as DictionaryProps),
            expected: expected
        });
    }

    // patterns
    addPattern(pattern: DictionaryPattern) {
        return new Dictionary({
            ...(this as DictionaryProps),
            patterns: this.patterns.add(pattern)
        });
    }

    updatePattern(old: DictionaryPattern, newPattern: DictionaryPattern) {
        return new Dictionary({
            ...(this as DictionaryProps),
            patterns: this.patterns.update(old, newPattern)
        });
    }

    removePattern(pattern: DictionaryPattern) {
        return new Dictionary({
            ...(this as DictionaryProps),
            patterns: this.patterns.remove(pattern)
        });
    }

    // specs
    addSpec(spec: DictionarySpec) {
        return new Dictionary({
            ...(this as DictionaryProps),
            specs: this.specs.add(spec)
        });
    }

    updateSpec(oldSpec: DictionarySpec, newSpec: DictionarySpec) {
        return new Dictionary({
            ...(this as DictionaryProps),
            specs: this.specs.update(oldSpec, newSpec)
        });
    }

    removeSpec(spec: DictionarySpec) {
        return new Dictionary({
            ...(this as DictionaryProps),
            specs: this.specs.remove(spec)
        });
    }

    updateSpecs(newSpecs: DictionarySpecs) {
        return new Dictionary({
            ...(this as DictionaryProps),
            specs: newSpecs
        });
    }

    updateWordClasses(wordClasses: DictionaryWordClasses) {
        return new Dictionary({
            ...(this as DictionaryProps),
            wordClasses
        });
    }

    updateDescription(description: DictionaryDescription) {
        return new Dictionary({
            ...(this as DictionaryProps),
            description
        });
    }

    updateTags(tags: DictionaryTags) {
        return new Dictionary({
            ...(this as DictionaryProps),
            tags
        });
    }
}
