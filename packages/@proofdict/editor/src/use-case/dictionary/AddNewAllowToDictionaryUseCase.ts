// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary/Dictionary";
import { createAllow } from "../../domain/Dictionary/DictionaryAllowFactory";

export const createAddNewAllowToDictionaryUseCase = () => {
    return new AddNewAllowToDictionaryUseCase({
        dictionaryRepository
    });
};

export class AddNewAllowToDictionaryUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier, value: string = "") {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        const newDictionary = dictionary.addAllow(createAllow(value));
        this.repo.dictionaryRepository.save(newDictionary);
    }
}
