// MIT © 2017 azu
import { splice } from "@immutable-array/prototype";
import { DictionaryAllow } from "./DictionaryAllow";
import { Serializer } from "ddd-base";

export const DictionaryAllowsSerializer: Serializer<DictionaryAllows, DictionaryAllowsJSON> = {
    fromJSON(patternStrings = []) {
        return new DictionaryAllows(
            patternStrings.map(
                value =>
                    new DictionaryAllow({
                        value: value
                    })
            )
        );
    },
    toJSON(entity) {
        return entity.getAllowValuesWithoutEmpty();
    }
};
export type DictionaryAllowsJSON = string[];

/**
 * Collection of DictionaryAllow
 */
export class DictionaryAllows {
    constructor(private patterns: DictionaryAllow[]) {}

    // read
    getAllows(): DictionaryAllow[] {
        return this.patterns;
    }

    getAllowValues(): string[] {
        return this.patterns.map(pattern => pattern.value);
    }

    getAllowValuesWithoutEmpty(): string[] {
        return this.getAllowValues().filter(pattern => pattern.length > 0);
    }

    // write
    add(pattern: DictionaryAllow) {
        return new DictionaryAllows(this.patterns.concat(pattern));
    }

    update(oldAllow: DictionaryAllow, newAllow: DictionaryAllow) {
        const index = this.patterns.findIndex(targetPattern => {
            return targetPattern.equals(oldAllow);
        });
        if (index === -1) {
            return this;
        }
        const dictionaryAllows = splice(this.patterns, index, 1, newAllow);
        return new DictionaryAllows(dictionaryAllows);
    }

    remove(allow: DictionaryAllow) {
        const index = this.patterns.findIndex(targetPattern => {
            return targetPattern.equals(allow);
        });
        if (index === -1) {
            return this;
        }
        return new DictionaryAllows(splice(this.patterns, index, 1));
    }
}
