import { UseCase } from "almin";
import { SourceRepoRepository, sourceRepoRepository } from "../../infra/repository/SourceRepoRepository";
import { createSourceRepo } from "../../domain/SourceRepo/SourceRepoCreator";

const debug = require("debug")("InitializeUseCase");
export const createInitializeUseCase = () => {
    return new InitializeUseCase({ sourceRepoRepository });
};

export interface InitializeUseCaseArgs {
    // owner/name
    owner?: string;
    repo?: string;
    branch?: string;
    proofdictDataPath?: string;
}

export class InitializeUseCase extends UseCase {
    constructor(private repo: { sourceRepoRepository: SourceRepoRepository }) {
        super();
    }

    execute(args: InitializeUseCaseArgs) {
        if (!args.owner || !args.repo) {
            debug("owner or repo is not defined");
            return;
        }
        const sourceRepo = createSourceRepo({
            owner: args.owner,
            repo: args.repo,
            branch: args.branch,
            proofdictDataPath: args.proofdictDataPath
        });
        this.repo.sourceRepoRepository.save(sourceRepo);
    }
}
