// MIT © 2017 azu
import { Payload, Store } from "almin";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import { Dictionary, DictionarySerializer } from "../../../../domain/Dictionary/Dictionary";
import { jsonFormatter } from "../../../../infra/formatter/JSONFormatter";
import { ChangeDictionaryOutputFormatUseCasePayload } from "../../../../use-case/dictionary/ChangeDictionaryOutputFormatUseCase";
import { yamlFormatter } from "../../../../infra/formatter/YamlFormatter";
import { prhFormatter } from "../../../../infra/formatter/PrhFormatter";
import memoize from "micro-memoize";
import { createHooks } from "../../../../hooks/almin-hook";

export type DictOutputFormat = "json" | "yml" | "prh";

export interface DictOutputStateProps {
    output: string;
    format: DictOutputFormat;
}

export class DictOutputState {
    output: string;
    format: DictOutputFormat;

    constructor(props: DictOutputStateProps) {
        this.output = props.output;
        this.format = props.format;
    }

    createOutput(dictionary: Dictionary, format: DictOutputFormat): string {
        if (format === "json") {
            return jsonFormatter(DictionarySerializer.toJSON(dictionary));
        } else if (format === "yml") {
            return yamlFormatter(DictionarySerializer.toJSON(dictionary));
        } else if (format === "prh") {
            return prhFormatter(DictionarySerializer.toJSON(dictionary));
        }
        throw new Error("Not support format:" + format);
    }

    update(dictionary: Dictionary) {
        const output = this.createOutput(dictionary, this.format);
        if (this.output === output) {
            return this;
        }
        return new DictOutputState({
            ...(this as DictOutputStateProps),
            output
        });
    }

    reduce(payload: Payload | ChangeDictionaryOutputFormatUseCasePayload) {
        if (payload instanceof ChangeDictionaryOutputFormatUseCasePayload) {
            return new DictOutputState({
                ...(this as DictOutputStateProps),
                format: payload.format
            });
        }
        return this;
    }
}

export const memorizedFactory = memoize((state: DictOutputState, dictionary: Dictionary) => {
    return new DictOutputState({
        ...state,
        output: state.createOutput(dictionary, state.format)
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
