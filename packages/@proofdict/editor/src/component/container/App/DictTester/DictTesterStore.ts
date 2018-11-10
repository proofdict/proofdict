// MIT © 2017 azu
import { Store } from "almin";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import { Dictionary } from "../../../../domain/Dictionary/Dictionary";
import memoize from "micro-memoize";
import { createHooks } from "../../../../hooks/almin-hook";

export interface DictTesterStateProps {
    inputs: string[];
    outputs: (string | undefined)[];
}

export class DictTesterState implements DictTesterStateProps {
    inputs: string[];
    outputs: (string | undefined)[];

    constructor(props: DictTesterStateProps) {
        this.inputs = props.inputs;
        this.outputs = props.outputs;
    }

    getOutput(inputIndex: number): string {
        return this.outputs[inputIndex] || "";
    }

    hasOutput(inputIndex: number): boolean {
        return this.outputs[inputIndex] !== undefined;
    }
}

export const memorizedFactory = memoize((state: DictTesterState, dictionary: Dictionary) => {
    return new DictTesterState({
        inputs: dictionary.specs.getActualPatterns(),
        outputs: dictionary.specs.getExpectedResults()
    });
});

export class DictTesterStore extends Store<DictTesterState> {
    state: DictTesterState;

    constructor(repo: { dictionaryRepository: DictionaryRepository }) {
        super();
        this.state = new DictTesterState({
            inputs: [],
            outputs: []
        });
        const { useEntity } = createHooks(this, [repo.dictionaryRepository]);
        useEntity((state, [dictionary]) => {
            this.setState(memorizedFactory(this.state, dictionary));
        });
    }

    getState(): DictTesterState {
        return this.state;
    }
}
