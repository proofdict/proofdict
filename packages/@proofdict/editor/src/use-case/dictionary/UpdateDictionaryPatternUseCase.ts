// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary/Dictionary";
import { DictionaryPattern } from "../../domain/Dictionary/DictionaryPattern";
import { createUpdateDictionarySpecStatusUseCase } from "./UpdateDictionarySpecStatusUseCase";

export const createUpdateDictionaryPatternUseCase = () => {
    return new UpdateDictionaryPatternUseCase({
        dictionaryRepository
    });
};

export class UpdateDictionaryPatternUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier, oldExpect: string, newExpect: string) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        const newDictionary = dictionary.updatePattern(
            new DictionaryPattern(oldExpect),
            new DictionaryPattern(newExpect)
        );
        this.repo.dictionaryRepository.save(newDictionary);

        return this.context.useCase(createUpdateDictionarySpecStatusUseCase()).execute(newDictionary.id);
    }
}
