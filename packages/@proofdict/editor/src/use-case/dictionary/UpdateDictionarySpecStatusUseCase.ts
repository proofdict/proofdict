// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary";
import { getUniqueTokens, testPattern } from "../../infra/prh/Prh";
import { DictionaryWordClassesSerializer } from "../../domain/DictionaryWordClasses";
import { DictionarySpecs } from "../../domain/DictionarySpecs";

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
        // update all spec
        const newSpecList = dictionary.specs.getSpecList().map(spec => {
            return testPattern(dictionary, spec);
        });
        const specs = new DictionarySpecs(newSpecList);
        const newDictionary = dictionary.updateSpecs(specs);
        this.args.dictionaryRepository.save(newDictionary);
        // update all word class
        return getUniqueTokens(newDictionary).then(tokens => {
            const dictionaryWordClasses = DictionaryWordClassesSerializer.fromJSON(tokens);
            const wordClassesDictionary = newDictionary.updateWordClasses(dictionaryWordClasses);
            this.args.dictionaryRepository.save(wordClassesDictionary);
            console.log(wordClassesDictionary);
        });
    }
}
