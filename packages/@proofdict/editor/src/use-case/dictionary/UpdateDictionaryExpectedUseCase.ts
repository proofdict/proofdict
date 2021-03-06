// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryExpected, DictionaryIdentifier } from "@proofdict/domain";
import { createUpdateDictionarySpecStatusUseCase } from "./UpdateDictionarySpecStatusUseCase";

export const createUpdateDictionaryExpectedUseCase = () => {
    return new UpdateDictionaryExpectedUseCase({
        dictionaryRepository
    });
};

export class UpdateDictionaryExpectedUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier, pattern: string) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        const newDictionary = dictionary.inputExpected(new DictionaryExpected(pattern));
        this.repo.dictionaryRepository.save(newDictionary);
        return this.context.useCase(createUpdateDictionarySpecStatusUseCase()).execute(newDictionary.id);
    }
}
