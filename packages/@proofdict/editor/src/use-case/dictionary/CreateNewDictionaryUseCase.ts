// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { createDictionary } from "../../domain/Dictionary/DictionaryFactory";
import { DictionaryPattern } from "../../domain/Dictionary/DictionaryPattern";
import { DictionaryExpected } from "../../domain/Dictionary/DictionaryExpected";
import { DictionarySpec } from "../../domain/Dictionary/DictionarySpec";
import { DictionarySerializer } from "../../domain/Dictionary/Dictionary";

export const createCreateNewDictionaryUseCase = () => {
    return new CreateNewDictionaryUseCase({ dictionaryRepository });
};

export class CreateNewDictionaryUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(jsonContent?: string) {
        if (jsonContent) {
            try {
                const dictionaryFromJSON = DictionarySerializer.fromJSON(JSON.parse(jsonContent));
                this.repo.dictionaryRepository.save(dictionaryFromJSON);
                return;
            } catch (error) {
                console.error(error);
            }
        }
        const dictionary = createDictionary()
            .inputExpected(new DictionaryExpected(""))
            .addPattern(new DictionaryPattern(""))
            .addSpec(new DictionarySpec({ from: "" }));
        this.repo.dictionaryRepository.save(dictionary);
    }
}
