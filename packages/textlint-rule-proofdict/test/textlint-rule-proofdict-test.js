const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
import rule from "../src/textlint-rule-proofdict";
// ruleName, rule, { valid, invalid }
tester.run("proofdict", rule, {
    valid: [],
    invalid: [
        {
            text: "texlint check your texts.\n" + "jquery is libray.\n",
            output: "texlint check your texts.\n" + "jQuery is libray.\n",
            options: {
                autoUpdate: true
            },
            errors: [
                {
                    message:
                        "jquery => jQuery\nReference http://jquery.com/\nSee https://proofdict.github.io/item/01BQ92YYBJENZB6M480KCJ0J99",
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
                    message:
                        "jquery => jQuery\nReference http://jquery.com/\nSee https://proofdict.github.io/item/01BQ92YYBJENZB6M480KCJ0J99",
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
                    message:
                        "どういう => どのような\n「どういう」は口語表現です\nSee https://proofdict.github.io/item/01BQ92YXB8FEH6HPDEZ3T430E2",
                    line: 1,
                    column: 1
                }
            ]
        }
    ]
});
