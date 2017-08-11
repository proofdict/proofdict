// MIT © 2017 azu
import { DictionaryTag, DictionaryTagJSON } from "./DictionaryTag";
import { Serializer } from "../ddd-base/Serializer";

export type DictionaryTagsJSON = DictionaryTagJSON[];

export const DictionaryTagsSerializer: Serializer<DictionaryTags, DictionaryTagsJSON> = {
    fromJSON(json) {
        return new DictionaryTags(json.map(tag => new DictionaryTag(tag)));
    },
    toJSON(entity) {
        return entity.tags.map(tag => tag.value);
    }
};

export class DictionaryTags {
    tags: DictionaryTag[];

    constructor(tags: DictionaryTag[]) {
        this.tags = tags;
    }

    toValue() {
        return this.tags.map(tag => tag.value);
    }
}
