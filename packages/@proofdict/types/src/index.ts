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
     * Allow patterns that are consist of string or regexp-like string, or typical pattern string {{}}.
     * If this pattern is match, just ignore it.
     */
    allows?: string[];
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
