// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { openURLinNewWindow } from "../../infra/window/WindowOpen";
import { DictionaryIdentifier, DictionarySerializer } from "../../domain/Dictionary/Dictionary";
import { createNewFileURL } from "../../infra/github/GitHubNewFileCreator";
import { createSlugFromDictionary } from "../../domain/Dictionary/DictionarySlugCreator";
import { yamlFormatter } from "../../infra/formatter/YamlFormatter";
import { SourceRepoRepository, sourceRepoRepository } from "../../infra/repository/SourceRepoRepository";

export const createSubmitDictionaryToGitHubUseCase = () => {
    return new SubmitDictionaryToGitHubUseCase({
        dictionaryRepository,
        sourceRepoRepository
    });
};

export class SubmitDictionaryToGitHubUseCase extends UseCase {
    constructor(
        private repo: {
            dictionaryRepository: DictionaryRepository;
            sourceRepoRepository: SourceRepoRepository;
        }
    ) {
        super();
    }

    execute(id: DictionaryIdentifier) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        const sourceRepo = this.repo.sourceRepoRepository.get();
        if (!sourceRepo) {
            throw new Error("Not found sourceRepo");
        }
        const dictionaryPath = createSlugFromDictionary(dictionary);
        const url = createNewFileURL({
            owner: sourceRepo.owner,
            repo: sourceRepo.repo,
            branch: sourceRepo.branch,
            proofdictDataPath: sourceRepo.proofdictDataPath,
            fileNameWithExt: dictionaryPath + ".yml",
            fileContent: yamlFormatter(DictionarySerializer.toJSON(dictionary))
        });
        openURLinNewWindow(url);
    }
}
