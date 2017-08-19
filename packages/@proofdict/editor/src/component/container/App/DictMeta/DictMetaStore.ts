// MIT © 2017 azu
import { Store } from "almin";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import { Dictionary } from "../../../../domain/Dictionary";

export interface DictMetaStateArgs {
    description: string;
    selectedTags: string[];
    suggestTags: string[];
}

export class DictMetaState {
    description: string;
    selectedTags: string[];
    suggestTags: string[];

    constructor(args: DictMetaStateArgs) {
        this.description = args.description;
        this.selectedTags = args.selectedTags;
        this.suggestTags = args.suggestTags;
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
            selectedTags: [],
            // Special keywords is defined by https://github.com/proofdict/proofdict
            suggestTags: ["noun", "opinion"]
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
