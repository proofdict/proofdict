import { Diff } from "prh";
export declare type Proofdict = ProofdictRule[];
export interface ProofdictRule {
    id?: string;
    description?: string;
    expected: string;
    patterns: string[];
    tags: string[];
    specs?: ProofdictSpec[];
    [index: string]: any;
}
export interface ProofdictSpec {
    from: string;
    to: string;
}
export interface ProofdictTesterResultDetail {
    rule: ProofdictRule;
    description?: string;
    matchStartIndex: number;
    matchEndIndex: number;
    actual: string;
    expected: string;
}
export interface ProofdictTesterResult {
    output: string;
    details: ProofdictTesterResultDetail[];
    diffs?: Diff[];
}
export interface ProofdictTesterOptions {
    dictionary: Proofdict;
    whitelistTags?: string[];
    blacklistTags?: string[];
}
export declare class ProofdictTester {
    private prhEngine;
    private proofdict;
    constructor(options: ProofdictTesterOptions);
    replace(text: string): Promise<string>;
    match(text: string): Promise<ProofdictTesterResult>;
}
