// MIT © 2017 azu
import { ValueObject } from "../../ddd-base/ValueObject";

export interface DictionarySpecJSON {
    from: string;
    to: string;
}

export interface DictionarySpecArgs {
    from: string;
    to?: string;
    error?: Error;
}

export class DictionarySpec extends ValueObject {
    from: string;
    to?: string;
    error?: Error;

    constructor(args: DictionarySpecArgs) {
        super();
        this.from = args.from;
        this.to = args.to;
    }

    get isInvalid(): boolean {
        return this.error !== undefined;
    }

    get isFilled(): boolean {
        if (!this.from) {
            return false;
        }
        if (!this.to) {
            return false;
        }
        return true;
    }

    updateExpected(expected: string) {
        return new DictionarySpec({
            ...(this as DictionarySpecArgs),
            to: expected
        });
    }

    invalid(error: Error) {
        return new DictionarySpec({
            ...(this as DictionarySpecArgs),
            error
        });
    }
}
