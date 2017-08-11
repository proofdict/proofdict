// MIT © 2017 azu
import { Store } from "almin";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import { Dictionary } from "../../../../domain/Dictionary";

export interface DictMetaStateArgs {
    description: string;
    selectedTags: string[];
}

export class DictMetaState {
    description: string;
    selectedTags: string[];

    constructor(args: DictMetaStateArgs) {
        this.description = args.description;
        this.selectedTags = args.selectedTags;
    }

    update(dictionary: Dictionary) {
        return new DictMetaState({
            ...this as DictMetaStateArgs,
            selectedTags: dictionary.tags.toValue(),
            description: dictionary.description.value
        });
    }
}

export class DictMetaStore extends Store<DictMetaState> {
    state: DictMetaState;

    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
        this.state = new DictMetaState({
            description: "",
            selectedTags: []
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
