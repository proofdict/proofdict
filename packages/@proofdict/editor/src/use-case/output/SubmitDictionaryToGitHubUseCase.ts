// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { openURLinNewWindow } from "../../infra/window/WindowOpen";
import { DictionaryIdentifier, DictionarySerializer } from "../../domain/Dictionary";
import { createNewFileURL } from "../../infra/github/GitHubNewFileCreator";
import { createSlugFromDictionary } from "../../domain/DictionarySlugCreator";
import { yamlFormatter } from "../../infra/formatter/YamlFormatter";

export const createSubmitDictionaryToGitHubUseCase = () => {
    return new SubmitDictionaryToGitHubUseCase({
        dictionaryRepository
    });
};

export class SubmitDictionaryToGitHubUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        const slug = createSlugFromDictionary(dictionary);
        const url = createNewFileURL(slug + ".yml", yamlFormatter(DictionarySerializer.toJSON(dictionary)));
        openURLinNewWindow(url);
    }
}
