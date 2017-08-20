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
            text: "This is webkit.",
            output: "This is WebKit.",
            options: {
                proofdict: require("./fixtures/proofdict.json")
            },
            errors: [
                {
                    message: "webkit => WebKit\n"
                    + "Reference https://webkit.org/\n"
                    + "See https://proofdict.github.io/item/01BQ92YZ6QR8RJKA5Y8W2F9NMY",
                    line: 1,
                    column: 9
                }
            ]
        }
    ]
});
