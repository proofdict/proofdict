// MIT © 2017 azu
import { Store } from "almin";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import { Dictionary } from "@proofdict/domain";
import { createHooks } from "../../../../hooks/almin-hook";
import { createShallowEqualSelector } from "../../../../hooks/selector";

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

const specSelector = (state: DictTesterState, dictionary: Dictionary) => {
    return dictionary.specs;
};

const stateSelector = createShallowEqualSelector(specSelector, specs => {
    return new DictTesterState({
        inputs: specs.getActualPatterns(),
        outputs: specs.getExpectedResults()
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
            this.setState(stateSelector(this.state, dictionary));
        });
    }

    getState(): DictTesterState {
        return this.state;
    }
}
