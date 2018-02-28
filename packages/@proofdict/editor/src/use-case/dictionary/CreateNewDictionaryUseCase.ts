// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { createDictionary } from "../../domain/Dictionary/DictionaryFactory";
import { DictionaryPattern } from "../../domain/Dictionary/DictionaryPattern";
import { DictionaryExpected } from "../../domain/Dictionary/DictionaryExpected";
import { DictionarySpec } from "../../domain/Dictionary/DictionarySpec";

export const createCreateNewDictionaryUseCase = () => {
    return new CreateNewDictionaryUseCase({ dictionaryRepository });
};

export class CreateNewDictionaryUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute() {
        const dictionary = createDictionary()
            .inputExpected(new DictionaryExpected(""))
            .addPattern(new DictionaryPattern(""))
            .addSpec(new DictionarySpec({ from: "" }));
        this.repo.dictionaryRepository.save(dictionary);
    }
}
