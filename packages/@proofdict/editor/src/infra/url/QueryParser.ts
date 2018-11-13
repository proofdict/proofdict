import * as url from "url";

export const parseQuery = <T extends { [index: string]: string }>(urlString: string): T => {
    const res = url.parse(urlString, true);
    return res.query as T;
};
