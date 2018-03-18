const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
import rule from "../src/textlint-rule-proofdict";
// IN testing , disable tester cache
const disableProofdictTesterCache = true;
const defaultOptions = {
    disableProofdictTesterCache,
    proofdict: require("./fixtures/proofdict.json")
};
// ruleName, rule, { valid, invalid }
tester.run("proofdict", rule, {
    valid: [
        {
            text: "jQuery",
            options: defaultOptions
        },
        {
            text: "WebKit",
            options: defaultOptions
        },
        {
            text: "WebKit",
            options: defaultOptions
        },
    ],
    invalid: [
        {
            text: "texlint check your texts.\n" + "jquery is libray.\n",
            output: "texlint check your texts.\n" + "jQuery is libray.\n",
            options: {
                dictURL: "https://proofdict.github.io/proof-dictionary/",
                disableProofdictTesterCache
            },
            errors: [
                {
                    message:
                        "jquery => jQuery\nReference http://jquery.com/\nSee https://proofdict.github.io/proof-dictionary/#01BQ92YYBJENZB6M480KCJ0J99",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            text: "jquery",
            output: "jQuery",
            options: {
                dictURL: "https://proofdict.github.io/proof-dictionary/",
                disableProofdictTesterCache
            },
            errors: [
                {
                    message:
                        "jquery => jQuery\nReference http://jquery.com/\nSee https://proofdict.github.io/proof-dictionary/#01BQ92YYBJENZB6M480KCJ0J99",
                    line: 1,
                    column: 1
                }
            ]
        },
        {
            text: "This is webkit.",
            output: "This is WebKit.",
            options: {
                proofdict: [
                    {
                        "id": "01BQ92YZ6QR8RJKA5Y8W2F9NMY",
                        "description": "Reference https://webkit.org/",
                        "expected": "WebKit",
                        "patterns": [
                            "/webkit/i"
                        ],
                        "specs": [
                            {
                                "from": "これはwebkitです",
                                "to": "これはWebKitです"
                            },
                            {
                                "from": "XXXwebkit",
                                "to": "XXXwebkit"
                            },
                            {
                                "from": "node-webkit",
                                "to": "node-webkit"
                            }
                        ],
                        "tags": [
                            "noun"
                        ]
                    }
                ],
                disableProofdictTesterCache
            },
            errors: [
                {
                    message: "webkit => WebKit\n"
                    + "Reference https://webkit.org/",
                    line: 1,
                    column: 9
                }
            ]
        }
    ]
});
