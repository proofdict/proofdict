// MIT © 2017 azu
import { Store } from "almin";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import { Dictionary } from "../../../../domain/Dictionary";

export interface DictMetaStateArgs {
    description: string;
}

export class DictMetaState {
    description: string;

    constructor(args: DictMetaStateArgs) {
        this.description = args.description;
    }

    update(dictionary: Dictionary) {
        return new DictMetaState({
            ...this as DictMetaStateArgs,
            description: dictionary.description.value
        });
    }
}

export class DictMetaStore extends Store<DictMetaState> {
    state: DictMetaState;

    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
        this.state = new DictMetaState({
            description: ""
        });
    }

    receivePayload() {
        const dictionary = this.repo.dictionaryRepository.get();
        this.setState(this.state.update(dictionary));
    }

    getState(): DictMetaState {
        return this.state;
    }
}
