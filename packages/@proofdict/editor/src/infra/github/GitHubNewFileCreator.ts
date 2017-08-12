// MIT © 2017 azu
export function createNewFileURL(fileNameWithExt: string, fileContent: string): string {
    return `https://github.com/proofdict/proofdict/new/master?filename=dict/${encodeURIComponent(
        fileNameWithExt
    )}&value=${encodeURIComponent(fileContent)}`;
}
