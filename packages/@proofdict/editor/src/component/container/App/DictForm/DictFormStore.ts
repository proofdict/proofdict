// MIT © 2017 azu
import { Store } from "almin";
import { Dictionary, DictionaryIdentifier } from "../../../../domain/Dictionary";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";

export interface DictFormStateProps {
    dictionaryId: DictionaryIdentifier;
    pattern?: string;
    expects: string[];
}

export class DictFormState {
    dictionaryId: DictionaryIdentifier;
    pattern?: string;
    expects: string[];

    constructor(props: DictFormStateProps) {
        this.dictionaryId = props.dictionaryId;
        this.pattern = props.pattern;
        this.expects = props.expects;
    }

    update(dictionary: Dictionary) {
        return new DictFormState({
            dictionaryId: dictionary.id,
            pattern: dictionary.pattern && dictionary.pattern.value,
            expects: dictionary.expects.map(expect => {
                return expect.value;
            })
        });
    }
}

export class DictFormStore extends Store<DictFormState> {
    state: DictFormState;

    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
        const dictionary = this.repo.dictionaryRepository.get();
        this.state = new DictFormState({
            dictionaryId: dictionary.id,
            expects: []
        });
    }

    receivePayload() {
        const dictionary = this.repo.dictionaryRepository.get();
        this.setState(this.state.update(dictionary));
    }

    getState(): DictFormState {
        return this.state;
    }
}
