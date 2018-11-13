// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary/Dictionary";
import { createUpdateDictionarySpecStatusUseCase } from "./UpdateDictionarySpecStatusUseCase";
import { createAllow } from "../../domain/Dictionary/DictionaryAllowFactory";

export const createUpdateDictionaryAllowUseCase = () => {
    return new UpdateDictionaryAllowUseCase({
        dictionaryRepository
    });
};

export class UpdateDictionaryAllowUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier, oldAllow: string, newAllow: string) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        const newDictionary = dictionary.updateAllow(createAllow(oldAllow), createAllow(newAllow));
        this.repo.dictionaryRepository.save(newDictionary);

        return this.context.useCase(createUpdateDictionarySpecStatusUseCase()).execute(newDictionary.id);
    }
}
