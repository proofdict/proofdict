// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary/Dictionary";
import { DictionaryTagsSerializer } from "../../domain/Dictionary/DictionaryTags";

export const createUpdateDictionaryTagsUseCase = () => {
    return new UpdateDictionaryTagsUseCase({
        dictionaryRepository
    });
};

export class UpdateDictionaryTagsUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier, tags: string[]) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary: ${id}`);
        }
        const newDictionary = dictionary.updateTags(DictionaryTagsSerializer.fromJSON(tags));
        this.repo.dictionaryRepository.save(newDictionary);
    }
}
