// MIT © 2017 azu
export type DictionaryTagJSON = string;

export class DictionaryTag {
    value: string;

    constructor(tagName: string) {
        this.value = tagName;
    }
}
