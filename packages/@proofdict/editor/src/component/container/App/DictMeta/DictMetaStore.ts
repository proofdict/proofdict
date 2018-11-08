// MIT © 2017 azu
import { Store } from "almin";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import memoize from "micro-memoize";
import { DictionaryDescription } from "../../../../domain/Dictionary/DictionaryDescription";
import { DictionaryTags } from "../../../../domain/Dictionary/DictionaryTags";

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
}
// TODO: state is change always
export const memorizedFactory = memoize(
    (state: DictMetaState, tags: DictionaryTags, description: DictionaryDescription) => {
        return new DictMetaState({
            ...state,
            selectedTags: tags.toValue(),
            description: description.value
        });
    }
);

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
        this.setState(memorizedFactory(this.state, dictionary.tags, dictionary.description));
    }

    getState(): DictMetaState {
        return this.state;
    }
}
