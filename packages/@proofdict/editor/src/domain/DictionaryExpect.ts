// MIT © 2017 azu
export class DictionaryExpect {
    value: string;

    constructor(value: string) {
        this.value = value;
    }

    equals(expect: DictionaryExpect) {
        return this.value === expect.value;
    }
}
