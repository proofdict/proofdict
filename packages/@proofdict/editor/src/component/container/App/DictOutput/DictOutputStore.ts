// MIT © 2017 azu
import { Store } from "almin";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import { Dictionary, DictionarySerializer } from "../../../../domain/Dictionary";
import { jsonFormatter } from "../../../../infra/formatter/JSONFormatter";
import { ChangeDictionaryOutputFormatUseCasePayload } from "../../../../use-case/dictionary/ChangeDictionaryOutputFormatUseCase";
import { yamlFormatter } from "../../../../infra/formatter/YamlFormatter";
import { prhFormatter } from "../../../../infra/formatter/PrhFormatter";

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

    private createOutput(dictionary: Dictionary, format: DictOutputFormat): string {
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
            ...this as DictOutputStateProps,
            output
        });
    }

    reduce(payload: ChangeDictionaryOutputFormatUseCasePayload) {
        if (payload instanceof ChangeDictionaryOutputFormatUseCasePayload) {
            return new DictOutputState({
                ...this as DictOutputStateProps,
                format: payload.format
            });
        }
        return this;
    }
}

export class DictOutputStore extends Store<DictOutputState> {
    state: DictOutputState;

    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
        this.state = new DictOutputState({
            format: "yml",
            output: ""
        });
    }

    receivePayload(payload: any) {
        const dictionary = this.repo.dictionaryRepository.get();
        this.setState(this.state.reduce(payload).update(dictionary));
    }

    getState(): DictOutputState {
        return this.state;
    }
}
