// MIT © 2017 azu
import { DictionaryWordClass, DictionaryWordClassJSON } from "./DictionaryWordClass";
import { Serializer } from "../ddd-base/Serializer";

export const DictionaryWordClassesSerializer: Serializer<DictionaryWordClasses, DictionaryWordClassesJSON> = {
    fromJSON(wordClasses) {
        return new DictionaryWordClasses(wordClasses.map(wordClass => new DictionaryWordClass(wordClass)));
    },
    toJSON(entity) {
        return entity.toList().map(wordClass => {
            return wordClass.toJSON();
        });
    }
};

export type DictionaryWordClassesJSON = DictionaryWordClassJSON[];

export class DictionaryWordClasses {
    private dictionaryWordClassList: ReadonlyArray<DictionaryWordClass>;

    constructor(dictionaryWordClassList: DictionaryWordClass[]) {
        this.dictionaryWordClassList = dictionaryWordClassList;
    }

    toList() {
        return this.dictionaryWordClassList;
    }

    get hasWordClass() {
        return this.dictionaryWordClassList.length > 0;
    }
}
