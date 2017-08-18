const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
import rule from "../src/textlint-rule-proofdict";
// ruleName, rule, { valid, invalid }
tester.run("proofdict", rule, {
    valid: [],
    invalid: [
        {
            text: "texlint check your texts.\n" +
            "jquery is libray.\n",
            output: "texlint check your texts.\n" +
            "jQuery is libray.\n",
            errors: [
                {
                    message: "jquery => jQuery",
                    line: 2,
                    column: 1
                }
            ]
        }
    ]
});