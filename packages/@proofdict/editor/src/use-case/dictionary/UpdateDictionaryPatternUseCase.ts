// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary";
import { DictionaryPattern } from "../../domain/DictionaryPattern";

export const createUpdateDictionaryPatternUseCase = () => {
    return new UpdateDictionaryPatternUseCase({
        dictionaryRepository
    });
};

export class UpdateDictionaryPatternUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier, pattern: string) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        dictionary.inputPattern(new DictionaryPattern(pattern));
        this.repo.dictionaryRepository.save(dictionary);
    }
}
