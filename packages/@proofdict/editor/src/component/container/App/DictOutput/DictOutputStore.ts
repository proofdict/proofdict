// MIT © 2017 azu
import { Payload, Store } from "almin";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import { Dictionary } from "../../../../domain/Dictionary/Dictionary";
import { ChangeDictionaryOutputFormatUseCasePayload } from "../../../../use-case/dictionary/ChangeDictionaryOutputFormatUseCase";
import memoize from "micro-memoize";
import { createHooks } from "../../../../hooks/almin-hook";
import { DictOutputFormatType, formatDictionary } from "../../../../domain/Dictionary/DictionaryFormatter";

export interface DictOutputStateProps {
    output: string;
    format: DictOutputFormatType;
}

export class DictOutputState {
    output: string;
    format: DictOutputFormatType;

    constructor(props: DictOutputStateProps) {
        this.output = props.output;
        this.format = props.format;
    }

    reduce(payload: Payload | ChangeDictionaryOutputFormatUseCasePayload) {
        if (payload instanceof ChangeDictionaryOutputFormatUseCasePayload) {
            return new DictOutputState({
                ...(this as DictOutputStateProps),
                format: payload.format,
                output: payload.output
            });
        }
        return this;
    }
}

export const memorizedFactory = memoize((state: DictOutputState, dictionary: Dictionary) => {
    return new DictOutputState({
        ...state,
        output: formatDictionary(dictionary, state.format)
    });
});

export class DictOutputStore extends Store<DictOutputState> {
    state: DictOutputState;

    constructor(repo: { dictionaryRepository: DictionaryRepository }) {
        super();
        this.state = new DictOutputState({
            format: "yml",
            output: ""
        });
        const { usePayload, useEntity } = createHooks(this, [repo.dictionaryRepository]);
        usePayload(payload => {
            this.setState(this.state.reduce(payload));
        });
        useEntity((state, [dictionary]) => {
            this.setState(memorizedFactory(state, dictionary));
        });
    }

    getState(): DictOutputState {
        return this.state;
    }
}
