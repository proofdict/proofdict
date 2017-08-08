// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary";
import { DictionarySpec } from "../../domain/DictionarySpec";

export const createAddNewSpecToDictionaryUseCase = () => {
    return new AddNewSpecToDictionaryUseCase({
        dictionaryRepository
    });
};

export class AddNewSpecToDictionaryUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        const newDictionary = dictionary.addSpec(
            new DictionarySpec({
                actual: ""
            })
        );
        this.repo.dictionaryRepository.save(newDictionary);
    }
}
