import { ValueObject } from "ddd-base";

export interface DictionaryAllowProps {
    value: string;
}

export class DictionaryAllow extends ValueObject<DictionaryAllowProps> {
    constructor(props: DictionaryAllowProps) {
        super(props);
    }

    get value() {
        return this.props.value;
    }
}
