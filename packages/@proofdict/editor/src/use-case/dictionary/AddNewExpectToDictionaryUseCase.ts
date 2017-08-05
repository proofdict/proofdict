// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary";
import { DictionaryExpect } from "../../domain/DictionaryExpect";

export const createAddNewExpectToDictionaryUseCase = () => {
    return new AddNewExpectToDictionaryUseCase({
        dictionaryRepository
    });
};

export class AddNewExpectToDictionaryUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        const newDictionary = dictionary.addExpect(new DictionaryExpect(""));
        this.repo.dictionaryRepository.save(newDictionary);
    }
}
