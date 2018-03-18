export interface ProofdictRule {
    id?: string;
    description?: string;
    expected: string;
    patterns: string[];
    tags: string[];
    specs?: ProofdictRuleSpec[];
    [index: string]: any;
}
export interface ProofdictRuleSpec {
    from: string;
    to: string;
}
