// MIT © 2017 azu
import { UseCase } from "almin";
import { DictionaryJSON, DictionarySerializer } from "../../domain/Dictionary/Dictionary";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { createUpdateDictionarySpecStatusUseCase } from "./UpdateDictionarySpecStatusUseCase";

export const createImportDictionaryFromJSONUseCase = () => {
    return new ImportDictionaryFromJSONUseCase({
        dictionaryRepository
    });
};

export class ImportDictionaryFromJSONUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(json: DictionaryJSON) {
        const dictionary = DictionarySerializer.fromJSON(json);
        this.repo.dictionaryRepository.save(dictionary);
        return this.context
            .useCase(createUpdateDictionarySpecStatusUseCase())
            .executor(useCase => useCase.execute(dictionary.id));
    }
}
