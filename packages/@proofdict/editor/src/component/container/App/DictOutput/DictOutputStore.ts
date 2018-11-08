// MIT © 2017 azu
import { Payload, Store } from "almin";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import { Dictionary, DictionarySerializer } from "../../../../domain/Dictionary/Dictionary";
import { jsonFormatter } from "../../../../infra/formatter/JSONFormatter";
import { ChangeDictionaryOutputFormatUseCasePayload } from "../../../../use-case/dictionary/ChangeDictionaryOutputFormatUseCase";
import { yamlFormatter } from "../../../../infra/formatter/YamlFormatter";
import { prhFormatter } from "../../../../infra/formatter/PrhFormatter";
import memoize from "micro-memoize";
import { NonNullableRepository, NullableRepository } from "ddd-base";

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

type NonUndefined<T> = T extends undefined ? never : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T;
type GetEntityType<R extends NonNullableRepository<any> | NullableRepository<any>> = NonUndefined<ReturnType<R["get"]>>;
export const createHooks = <State, T extends NonNullableRepository<any>>(store: Store<State>, repository: T) => {
    const createUsePayload = <State>(store: Store<State>) => {
        type PayloadHandler = (payload: Payload) => any;
        return (handler: PayloadHandler) => {
            const payloadHandlers: PayloadHandler[] = [];
            store.onDispatch(payload => {
                payloadHandlers.forEach(handler => handler(payload));
            });
            payloadHandlers.push(handler);
        };
    };
    const createUseEntity = (repository: T) => {
        type DomainHandler = (state: State, entity: GetEntityType<T>) => any;
        const domainHandlers: DomainHandler[] = [];
        repository.events.onSave(event => {
            domainHandlers.forEach(handler => handler(store.getState(), event.entity));
        });
        return (handler: DomainHandler) => {
            domainHandlers.push(handler);
        };
    };
    return {
        usePayload: createUsePayload(store),
        useEntity: createUseEntity(repository)
    };
};

export class DictOutputStore extends Store<DictOutputState> {
    state: DictOutputState;

    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
        this.state = new DictOutputState({
            format: "yml",
            output: ""
        });
        const { usePayload, useEntity } = createHooks(this, repo.dictionaryRepository);
        usePayload(payload => {
            this.setState(this.state.reduce(payload));
        });
        useEntity((state, dictionary) => {
            this.setState(memorizedFactory(state, dictionary));
        });
    }

    receivePayload(payload: any) {
        const dictionary = this.repo.dictionaryRepository.get();
        this.setState(memorizedFactory(this.state.reduce(payload), dictionary));
    }

    getState(): DictOutputState {
        return this.state;
    }
}
