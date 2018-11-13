// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary/Dictionary";
import { resetDictionary } from "../../domain/Dictionary/DictionaryFactory";

export const createResetDictionaryUseCase = () => {
    return new ResetDictionaryUseCase({
        dictionaryRepository
    });
};

export class ResetDictionaryUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        const newDictionary = resetDictionary(dictionary);
        this.repo.dictionaryRepository.save(newDictionary);
    }
}
