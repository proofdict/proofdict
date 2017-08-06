// MIT © 2017 azu
export class DictionaryPattern {
    value: string;

    constructor(value: string) {
        this.value = value;
    }

    equals(expect: DictionaryPattern) {
        return this.value === expect.value;
    }
}
