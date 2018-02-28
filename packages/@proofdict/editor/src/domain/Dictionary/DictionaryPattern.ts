// MIT © 2017 azu
export class DictionaryPattern {
    value: string;

    constructor(value: string) {
        this.value = value;
    }

    equals(pattern: DictionaryPattern) {
        return this.value === pattern.value;
    }
}
