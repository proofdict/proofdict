// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary";
import { DictionaryExpect } from "../../domain/DictionaryExpect";

export const createUpdateDictionaryExpectedUseCase = () => {
    return new UpdateDictionaryExpectedUseCase({
        dictionaryRepository
    });
};

export class UpdateDictionaryExpectedUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier, oldExpect: string, newExpect: string) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        const newDictionary = dictionary.updateExpect(new DictionaryExpect(oldExpect), new DictionaryExpect(newExpect));
        this.repo.dictionaryRepository.save(newDictionary);
    }
}
