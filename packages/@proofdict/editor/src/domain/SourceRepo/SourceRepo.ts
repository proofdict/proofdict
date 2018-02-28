import { Entity, Identifier } from "ddd-base";

export class SourceRepoIdentifier extends Identifier<string> {}

export interface SourceRepoArgs {
    id: SourceRepoIdentifier;
    owner: string;
    repo: string;
    branch: string;
    proofdictDataPath: string;
}

export class SourceRepo extends Entity<SourceRepoIdentifier> {
    owner: string;
    repo: string;
    branch: string;
    proofdictDataPath: string;

    constructor(args: SourceRepoArgs) {
        super(args.id);
        this.owner = args.owner;
        this.repo = args.repo;
        this.branch = args.branch;
        this.proofdictDataPath = args.proofdictDataPath;
    }
}
