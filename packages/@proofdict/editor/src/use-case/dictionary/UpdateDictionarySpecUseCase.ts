// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary/Dictionary";
import { DictionarySpec } from "../../domain/Dictionary/DictionarySpec";
import { createUpdateDictionarySpecStatusUseCase } from "./UpdateDictionarySpecStatusUseCase";

export const createUpdateDictionarySpecUseCase = () => {
    return new UpdateDictionarySpecUseCase({
        dictionaryRepository
    });
};

export class UpdateDictionarySpecUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier, oldSpecActual: string, newSpecActual?: string) {
        if (newSpecActual === undefined) {
            return;
        }
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        const oldSpec = dictionary.specs.findByActual(oldSpecActual);
        if (!oldSpec) {
            throw new Error(`Not found match the oldSpecActual:${oldSpec}`);
        }
        const newDictionary = dictionary.updateSpec(
            oldSpec,
            new DictionarySpec({
                from: newSpecActual
            })
        );
        this.repo.dictionaryRepository.save(newDictionary);
        return this.context.useCase(createUpdateDictionarySpecStatusUseCase()).execute(newDictionary.id);
    }
}
