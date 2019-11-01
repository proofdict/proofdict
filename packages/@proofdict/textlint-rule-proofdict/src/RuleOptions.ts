import { Proofdict } from "@proofdict/tester";

export type RuleOption = {
    // If you want to use live-proofdict
    // Proofdict-style dictionary URL
    // Example: "https://example.github.io/proof-dictionary/"
    // If you want to specific JSON end point, please pass
    // `dictURL; { jsonAPI: string, ruleBase: string }`
    dictURL?: { jsonAPI: string; ruleBase: string } | string;
    // If you want to use local proofdict
    // dictPath is glob style path
    dictGlob?: string | string[];
    // Default: 60sec(60 * 1000ms)
    autoUpdateInterval: number;
    // = Tag settings
    // Filter dictionary by whitelist or blacklist
    // Default: Enable all terms of the dictionary.
    // When set both options, this rule prefer whitelist to blacklist
    allowTags: string[];
    denyTags: string[];
    // For testing
    // set you proofdict json object
    proofdict?: Proofdict;
    // Disable cache for tester
    disableProofdictTesterCache: boolean;
};

export type RuleOptions =
    | RuleOption
    | {
          dicts?: RuleOption[];
      };
