// MIT © 2017 azu
import { DictionaryExpected } from "./DictionaryExpected";
import { DictionaryPattern } from "./DictionaryPattern";
import { Entity, Identifier } from "ddd-base";
import { DictionaryPatterns, DictionaryPatternsSerializer } from "./DictionaryPatterns";
import { DictionaryAllowsSerializer } from "./DictionaryAllows";
import { DictionarySpecs, DictionarySpecsJSON, DictionarySpecsSerializer } from "./DictionarySpecs";
import { DictionarySpec } from "./DictionarySpec";
import { Serializer } from "ddd-base";
import { DictionaryDescription } from "./DictionaryDescription";
import { DictionaryTags, DictionaryTagsJSON, DictionaryTagsSerializer } from "./DictionaryTags";
import { DictionaryAllows } from "./DictionaryAllows";
import { DictionaryAllow } from "./DictionaryAllow";

export class DictionaryIdentifier extends Identifier<string> {}

export interface DictionaryJSON {
    id: string;
    description: string;
    expected: string;
    patterns: string[];
    allows: string[];
    specs: DictionarySpecsJSON;
    tags: DictionaryTagsJSON;
}

export interface DictionaryProps {
    id: DictionaryIdentifier;
    description: DictionaryDescription;
    expected: DictionaryExpected;
    patterns: DictionaryPatterns;
    allows: DictionaryAllows;
    specs: DictionarySpecs;
    tags: DictionaryTags;
}

export const DictionarySerializer: Serializer<Dictionary, DictionaryJSON> = {
    fromJSON(json) {
        return new Dictionary({
            id: new DictionaryIdentifier(json.id),
            description: new DictionaryDescription(json.description || ""),
            expected: new DictionaryExpected(json.expected),
            patterns: DictionaryPatternsSerializer.fromJSON(json.patterns),
            allows: DictionaryAllowsSerializer.fromJSON(json.allows),
            specs: DictionarySpecsSerializer.fromJSON(json.specs),
            tags: DictionaryTagsSerializer.fromJSON(json.tags)
        });
    },
    toJSON(dictionary) {
        return {
            id: dictionary.id.toValue(),
            description: dictionary.description.value,
            expected: dictionary.expected.value,
            patterns: DictionaryPatternsSerializer.toJSON(dictionary.patterns),
            allows: DictionaryAllowsSerializer.toJSON(dictionary.allows),
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
    allows: DictionaryAllows;
    specs: DictionarySpecs;
    tags: DictionaryTags;

    constructor(props: DictionaryProps) {
        super(props);
        this.id = props.id;
        this.description = props.description;
        this.expected = props.expected;
        this.patterns = props.patterns;
        this.allows = props.allows;
        this.specs = props.specs;
        this.tags = props.tags;
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

    // allows
    addAllow(allow: DictionaryAllow) {
        return new Dictionary({
            ...(this as DictionaryProps),
            allows: this.allows.add(allow)
        });
    }

    updateAllow(old: DictionaryAllow, newPattern: DictionaryAllow) {
        return new Dictionary({
            ...(this as DictionaryProps),
            allows: this.allows.update(old, newPattern)
        });
    }

    removeAllow(allow: DictionaryAllow) {
        return new Dictionary({
            ...(this as DictionaryProps),
            allows: this.allows.remove(allow)
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
        if (newSpecs.equals(this.specs)) {
            return this;
        }
        return new Dictionary({
            ...(this as DictionaryProps),
            specs: newSpecs
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
