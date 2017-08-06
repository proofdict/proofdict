// MIT © 2017 azu
import { Store } from "almin";
import { Dictionary, DictionaryIdentifier } from "../../../../domain/Dictionary";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";

export interface DictFormStateProps {
    dictionaryId: DictionaryIdentifier;
    expect?: string;
    patterns: string[];
}

export class DictFormState {
    dictionaryId: DictionaryIdentifier;
    expect?: string;
    patterns: string[];

    constructor(props: DictFormStateProps) {
        this.dictionaryId = props.dictionaryId;
        this.expect = props.expect;
        this.patterns = props.patterns;
    }

    update(dictionary: Dictionary) {
        return new DictFormState({
            dictionaryId: dictionary.id,
            expect: dictionary.expect && dictionary.expect.value,
            patterns: dictionary.patterns.map(pattern => {
                return pattern.value;
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
            patterns: []
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
