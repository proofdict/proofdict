// MIT © 2017 azu
import { ValueObject } from "../ddd-base/ValueObject";

export interface DictionarySpecArgs {
    actual: string;
    expected?: string;
}

export class DictionarySpec extends ValueObject {
    actual: string;
    expected?: string;

    constructor(args: DictionarySpecArgs) {
        super();
        this.actual = args.actual;
        this.expected = args.expected;
    }

    get isFilled(): boolean {
        if (!this.actual) {
            return false;
        }
        if (!this.expected) {
            return false;
        }
        return true;
    }

    updateExpected(expected: string) {
        return new DictionarySpec({
            ...this as DictionarySpecArgs,
            expected
        });
    }
}
