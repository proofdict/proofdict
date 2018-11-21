// MIT © 2017 azu
import { Store } from "almin";
import { Dictionary, DictionaryAllow, DictionaryIdentifier, DictionaryPattern } from "@proofdict/domain";
import { DictionaryRepository } from "../../../../infra/repository/DictionaryRepository";
import { createHooks } from "../../../../hooks/almin-hook";
import { createShallowEqualSelector } from "../../../../hooks/selector";

export interface DictFormStateProps {
    dictionaryId: DictionaryIdentifier;
    expected?: string;
    patterns: DictionaryPattern[];
    allows: DictionaryAllow[];
}

export class DictFormState {
    dictionaryId: DictionaryIdentifier;
    expected?: string;
    patterns: DictionaryPattern[];
    allows: DictionaryAllow[];

    constructor(props: DictFormStateProps) {
        this.dictionaryId = props.dictionaryId;
        this.expected = props.expected;
        this.patterns = props.patterns;
        this.allows = props.allows;
    }
}

const propsSelector = (state: DictFormState, dictionary: Dictionary) => {
    return {
        dictionaryId: dictionary.id,
        expected: dictionary.expected,
        patterns: dictionary.patterns,
        allows: dictionary.allows
    };
};
const stateSelector = createShallowEqualSelector(propsSelector, ({ dictionaryId, expected, patterns, allows }) => {
    return new DictFormState({
        dictionaryId: dictionaryId,
        expected: expected.value,
        patterns: patterns.getPatterns(),
        allows: allows.getAllows()
    });
});

export class DictFormStore extends Store<DictFormState> {
    state: DictFormState;

    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
        const dictionary = this.repo.dictionaryRepository.get();
        this.state = new DictFormState({
            dictionaryId: dictionary.id,
            patterns: [],
            allows: []
        });
        const { useEntity } = createHooks(this, [repo.dictionaryRepository]);
        useEntity((state, [dictionary]) => {
            this.setState(stateSelector(state, dictionary));
        });
    }

    getState(): DictFormState {
        return this.state;
    }
}
