// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary/Dictionary";
import { DictionaryPattern } from "../../domain/Dictionary/DictionaryPattern";

export const createAddNewPatternToDictionaryUseCase = () => {
    return new AddNewPatternToDictionaryUseCase({
        dictionaryRepository
    });
};

export class AddNewPatternToDictionaryUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        const newDictionary = dictionary.addPattern(new DictionaryPattern(""));
        this.repo.dictionaryRepository.save(newDictionary);
    }
}
