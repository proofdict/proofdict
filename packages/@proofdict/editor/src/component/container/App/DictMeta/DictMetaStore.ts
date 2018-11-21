// MIT © 2017 azu
import { Store } from "almin";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import { Dictionary } from "@proofdict/domain";
import { createShallowEqualSelector } from "../../../../hooks/selector";
import { createHooks } from "../../../../hooks/almin-hook";

export interface DictMetaStateProps {
    description: string;
    selectedTags: string[];
    suggestTags: string[];
}

export class DictMetaState {
    description: string;
    selectedTags: string[];
    suggestTags: string[];

    constructor(props: DictMetaStateProps) {
        this.description = props.description;
        this.selectedTags = props.selectedTags;
        this.suggestTags = props.suggestTags;
    }
}

const dictionarySelector = (state: DictMetaState, dictionary: Dictionary) => {
    return {
        suggestTags: state.suggestTags,
        tags: dictionary.tags,
        description: dictionary.description
    };
};

const stateSelector = createShallowEqualSelector(
    dictionarySelector,
    ({ suggestTags, description, tags }) =>
        new DictMetaState({
            suggestTags: suggestTags,
            selectedTags: tags.toValue(),
            description: description.value
        })
);

export class DictMetaStore extends Store<DictMetaState> {
    state: DictMetaState;

    constructor(repo: { dictionaryRepository: DictionaryRepository }) {
        super();
        this.state = new DictMetaState({
            description: "",
            selectedTags: [],
            // Special keywords is defined by https://github.com/proofdict/proofdict
            suggestTags: ["noun", "opinion"]
        });
        const { useEntity } = createHooks(this, [repo.dictionaryRepository]);
        useEntity((state, [dictionary]) => {
            this.setState(stateSelector(this.state, dictionary));
        });
    }

    getState(): DictMetaState {
        return this.state;
    }
}
