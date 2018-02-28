// MIT © 2017 azu
export function createNewFileURL(args: {
    owner: string;
    repo: string;
    branch: string;
    fileNameWithExt: string;
    fileContent: string;
}): string {
    return `https://github.com/${encodeURIComponent(args.owner)}/${encodeURIComponent(
        args.repo
    )}/new/${encodeURIComponent(args.branch)}?filename=dict/${encodeURIComponent(
        args.fileNameWithExt
    )}&value=${encodeURIComponent(args.fileContent)}`;
}
