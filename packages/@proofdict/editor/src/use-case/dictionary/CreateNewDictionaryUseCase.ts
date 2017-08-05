// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { createDictionary } from "../../domain/DictionaryFactory";
import { DictionaryExpect } from "../../domain/DictionaryExpect";
import { DictionaryPattern } from "../../domain/DictionaryPattern";

export const createCreateNewDictionaryUseCase = () => {
    return new CreateNewDictionaryUseCase({ dictionaryRepository });
};

export class CreateNewDictionaryUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute() {
        const dictionary = createDictionary()
            .inputPattern(new DictionaryPattern(""))
            .addExpect(new DictionaryExpect(""));
        this.repo.dictionaryRepository.save(dictionary);
    }
}
