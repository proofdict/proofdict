// MIT © 2017 azu
import { Store } from "almin";

export interface DictTesterStateProps {
    input?: string;
    output?: string;
}

export class DictTesterState implements DictTesterStateProps {
    input?: string;
    output?: string;

    constructor(props: DictTesterStateProps) {
        this.input = props.input;
        this.output = props.output;
    }
}

export class DictTesterStore extends Store<DictTesterState> {
    state: DictTesterState;

    constructor() {
        super();
        this.state = new DictTesterState({});
    }

    getState(): DictTesterState {
        return this.state;
    }
}
