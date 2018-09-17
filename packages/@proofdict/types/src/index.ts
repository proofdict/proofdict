export interface ProofdictRule {
    /**
     * unique id between rules.
     */
    id?: string;
    /**
     * Description
     */
    description?: string;
    /**
     * Expected pattern
     */
    expected: string;
    /**
     * Match patterns that are consist of string or regexp-like string
     */
    patterns: string[];
    /**
     * Ignored string from matches
     */
    regexpMustEmpty: string;
    /**
     * Tags
     */
    tags: string[];
    /**
     * Testing specification of the rule
     */
    specs?: ProofdictRuleSpec[];

    [index: string]: any;
}

export interface ProofdictRuleSpec {
    from: string;
    to: string;
}
