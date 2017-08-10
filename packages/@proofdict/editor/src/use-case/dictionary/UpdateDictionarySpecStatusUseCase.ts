// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary";
import { DictionarySpec } from "../../domain/DictionarySpec";
import { testPattern } from "../../infra/prh/Prh";

export const createUpdateDictionarySpecStatusUseCase = () => {
    return new UpdateDictionarySpecStatusUseCase({
        dictionaryRepository
    });
};

export class UpdateDictionarySpecStatusUseCase extends UseCase {
    constructor(
        private args: {
            dictionaryRepository: DictionaryRepository;
        }
    ) {
        super();
    }

    execute(id: DictionaryIdentifier) {
        const dictionary = this.args.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        // update all status
        const newSpecs = dictionary.specs.getSpecList().map(spec => {
            return testPattern(dictionary, spec);
        });
        const newDictionary = dictionary.updateSpecList(newSpecs as DictionarySpec[]);
        this.args.dictionaryRepository.save(newDictionary);
    }
}
