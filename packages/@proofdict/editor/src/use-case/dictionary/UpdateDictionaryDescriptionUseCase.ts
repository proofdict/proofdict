// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary";
import { DictionaryDescription } from "../../domain/DictionaryDescription";

export const createUpdateDictionaryDescriptionUseCase = () => {
    return new UpdateDictionaryDescriptionUseCase({
        dictionaryRepository
    });
};

export class UpdateDictionaryDescriptionUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier, description: string) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        const newDictionary = dictionary.updateDescription(new DictionaryDescription(description));
        this.repo.dictionaryRepository.save(newDictionary);
    }
}
