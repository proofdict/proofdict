// MIT © 2017 azu
import { splice } from "@immutable-array/prototype";
import { DictionarySpec, DictionarySpecJSON } from "./DictionarySpec";
import { Serializer } from "../../ddd-base/Serializer";

export const DictionarySpecsSerializer: Serializer<DictionarySpecs, DictionarySpecsJSON> = {
    fromJSON(specs) {
        return new DictionarySpecs(specs.map(spec => new DictionarySpec(spec)));
    },
    toJSON(entity) {
        return entity
            .getSpecList()
            .filter(spec => spec.isFilled)
            .map(spec => {
                return {
                    from: spec.from,
                    to: spec.to!
                };
            });
    }
};

export type DictionarySpecsJSON = DictionarySpecJSON[];

/**
 * Collection of DictionarySpec
 */
export class DictionarySpecs {
    constructor(private specs: DictionarySpec[]) {}

    // read
    getSpecList(): DictionarySpec[] {
        return this.specs;
    }

    getFilledSpecList(): DictionarySpec[] {
        return this.specs.filter(spec => spec.isFilled);
    }

    getActualPatterns() {
        return this.getSpecList().map(spec => spec.from);
    }

    getExpectedResults() {
        return this.getSpecList().map(spec => {
            if (spec.isInvalid && spec.error) {
                return spec.error.message;
            } else {
                return spec.to;
            }
        });
    }

    // write
    add(spec: DictionarySpec) {
        return new DictionarySpecs(this.specs.concat(spec));
    }

    update(oldSpec: DictionarySpec, newSpec: DictionarySpec) {
        const index = this.specs.findIndex(target => {
            return target.equals(oldSpec);
        });
        if (index === -1) {
            return this;
        }
        const newSpecs = splice(this.specs, index, 1, newSpec);
        return new DictionarySpecs(newSpecs);
    }

    remove(spec: DictionarySpec) {
        const index = this.specs.findIndex(target => {
            return target.equals(spec);
        });
        if (index === -1) {
            return this;
        }
        return new DictionarySpecs(splice(this.specs, index, 1));
    }

    findByActual(oldSpecActual: string): DictionarySpec | undefined {
        return this.specs.find(target => {
            return target.from === oldSpecActual;
        });
    }
}
