// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary/Dictionary";
import { testPattern } from "../../infra/prh/Prh";
import { DictionarySpecs } from "../../domain/Dictionary/DictionarySpecs";

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

    async execute(id: DictionaryIdentifier) {
        const dictionary = this.args.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        // update all spec
        const newSpecPromises = dictionary.specs.getSpecList().map(async spec => {
            return testPattern(dictionary, spec);
        });
        const newSpecList = await Promise.all(newSpecPromises);
        const specs = new DictionarySpecs(newSpecList);
        const updatedSpecsDictionary = dictionary.updateSpecs(specs);
        this.args.dictionaryRepository.save(updatedSpecsDictionary);
        // update all word class
        /* Currently, disable
        return getUniqueTokens(updatedSpecsDictionary).then(tokens => {
            const dictionaryWordClasses = DictionaryWordClassesSerializer.fromJSON(tokens);
            const wordClassesDictionary = updatedSpecsDictionary.updateWordClasses(dictionaryWordClasses);
            const oldDictionary = this.args.dictionaryRepository.findById(wordClassesDictionary.id);
            // if already the dictionary updated by other usecase.
            // This useCase should not continue to update.
            if (oldDictionary === updatedSpecsDictionary) {
                this.args.dictionaryRepository.save(wordClassesDictionary);
            }
        });
        */
    }
}
