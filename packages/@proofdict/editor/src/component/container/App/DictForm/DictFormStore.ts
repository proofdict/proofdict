// MIT © 2017 azu
import { Store } from "almin";
import { Dictionary, DictionaryIdentifier } from "../../../../domain/Dictionary/Dictionary";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import { DictionaryPattern } from "../../../../domain/Dictionary/DictionaryPattern";
import memoize from "micro-memoize";
import { createHooks } from "../../../../hooks/almin-hook";

export interface DictFormStateProps {
    dictionaryId: DictionaryIdentifier;
    expected?: string;
    patterns: DictionaryPattern[];
}

export const memorizedFactory = memoize((state: DictFormState, dictionary: Dictionary) => {
    return new DictFormState({
        dictionaryId: dictionary.id,
        expected: dictionary.expected.value,
        patterns: dictionary.patterns.getPatterns()
    });
});

export class DictFormState {
    dictionaryId: DictionaryIdentifier;
    expected?: string;
    patterns: DictionaryPattern[];

    constructor(props: DictFormStateProps) {
        this.dictionaryId = props.dictionaryId;
        this.expected = props.expected;
        this.patterns = props.patterns;
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
        const { useEntity } = createHooks(this, [repo.dictionaryRepository]);
        useEntity((state, [dictionary]) => {
            this.setState(memorizedFactory(state, dictionary));
        });
    }

    getState(): DictFormState {
        return this.state;
    }
}
