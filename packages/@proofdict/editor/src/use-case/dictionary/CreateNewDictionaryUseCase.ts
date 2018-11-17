// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import {
    createDictionary,
    DictionaryExpected,
    DictionaryPattern,
    DictionarySerializer,
    DictionarySpec
} from "@proofdict/domain";

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
