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
            options: {
                autoUpdate: true
            },
            errors: [
                {
                    message: "jquery => jQuery",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            text: "jquery",
            output: "jQuery",
            options: {
                autoUpdate: true,
                autoFallback: true
            },
            errors: [
                {
                    message: "jquery => jQuery",
                    line: 1,
                    column: 1
                }
            ]
        },
        {
            text: "どういうものがthenableなのか",
            output: "どのようなものがthenableなのか",
            options: {
                autoUpdate: false
            },
            errors: [
                {
                    message: "どういう => どのような\n「どういう」は口語表現です",
                    line: 1,
                    column: 1
                }
            ]
        }

    ]
});