// MIT © 2017 azu
import { Store } from "almin";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import memoize from "micro-memoize";
import { createHooks } from "../../../../hooks/almin-hook";
import { Dictionary } from "../../../../domain/Dictionary/Dictionary";
import { DictionaryDescription } from "../../../../domain/Dictionary/DictionaryDescription";
import { DictionaryTags } from "../../../../domain/Dictionary/DictionaryTags";

export interface DictMetaStateProps {
    dp_description?: DictionaryDescription;
    dp_selectedTags?: DictionaryTags;
    suggestTags: string[];
}

export class DictMetaState {
    private dp_description?: DictionaryDescription;
    private dp_selectedTags?: DictionaryTags;
    suggestTags: string[];

    constructor(props: DictMetaStateProps) {
        this.dp_description = props.dp_description;
        this.dp_selectedTags = props.dp_selectedTags;
        this.suggestTags = props.suggestTags;
    }

    get description() {
        if (!this.dp_description) {
            return "";
        }
        return this.dp_description.value;
    }

    get selectedTags() {
        if (!this.dp_selectedTags) {
            return [];
        }
        return this.dp_selectedTags.toValue();
    }
}

export const domainToProps = memoize(
    (state: DictMetaState, tags: DictionaryTags, description: DictionaryDescription): DictMetaStateProps => {
        return {
            ...state,
            dp_selectedTags: tags,
            dp_description: description
        };
    }
);

export const createState = (state: DictMetaState, dictionary: Dictionary): DictMetaState => {
    return new DictMetaState(domainToProps(state, dictionary.tags, dictionary.description));
};

export class DictMetaStore extends Store<DictMetaState> {
    state: DictMetaState;

    constructor(repo: { dictionaryRepository: DictionaryRepository }) {
        super();
        this.state = new DictMetaState({
            // Special keywords is defined by https://github.com/proofdict/proofdict
            suggestTags: ["noun", "opinion"]
        });
        const { useEntity } = createHooks(this, [repo.dictionaryRepository]);
        useEntity((state, [dictionary]) => {
            this.setState(createState(this.state, dictionary));
        });
    }

    getState(): DictMetaState {
        return this.state;
    }
}
