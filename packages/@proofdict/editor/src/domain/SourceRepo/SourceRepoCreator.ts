import { SourceRepo, SourceRepoIdentifier } from "./SourceRepo";

export interface createSourceRepoArgs {
    owner: string;
    repo: string;
    branch?: string;
    proofdictDataPath?: string;
}

export const createSourceRepo = ({
    owner,
    repo,
    branch = "master",
    proofdictDataPath = "_data/proofdict"
}: createSourceRepoArgs) => {
    const slug = `${owner}/${repo}/${branch}`;
    return new SourceRepo({
        id: new SourceRepoIdentifier(slug),
        owner,
        repo,
        branch,
        proofdictDataPath
    });
};
