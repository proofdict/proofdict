// MIT © 2017 azu
import { ValueObject } from "../ddd-base/ValueObject";

export interface DictionarySpecArgs {
    actual: string;
    expected?: string;
    error?: Error;
}

export class DictionarySpec extends ValueObject {
    actual: string;
    expected?: string;
    error?: Error;

    constructor(args: DictionarySpecArgs) {
        super();
        this.actual = args.actual;
        this.expected = args.expected;
    }

    get isInvalid(): boolean {
        return this.error !== undefined;
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

    invalid(error: Error) {
        return new DictionarySpec({
            ...this as DictionarySpecArgs,
            error
        });
    }
}
