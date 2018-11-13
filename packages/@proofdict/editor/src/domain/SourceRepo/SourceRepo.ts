import { Entity, Identifier } from "ddd-base";

export class SourceRepoIdentifier extends Identifier<string> {}

export interface SourceRepoProps {
    id: SourceRepoIdentifier;
    owner: string;
    repo: string;
    branch: string;
    proofdictDataPath: string;
}

export class SourceRepo extends Entity<SourceRepoProps> {
    owner: string;
    repo: string;
    branch: string;
    proofdictDataPath: string;

    constructor(props: SourceRepoProps) {
        super(props);
        this.owner = props.owner;
        this.repo = props.repo;
        this.branch = props.branch;
        this.proofdictDataPath = props.proofdictDataPath;
    }
}
