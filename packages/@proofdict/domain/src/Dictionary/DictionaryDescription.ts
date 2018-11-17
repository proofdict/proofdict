// MIT © 2017 azu
export class DictionaryDescription {
    value: string;

    constructor(description: string) {
        this.value = description;
    }

    get hasValue() {
        return this.value.length > 0;
    }
}
