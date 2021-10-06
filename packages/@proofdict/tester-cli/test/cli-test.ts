import * as assert from "assert";
import { execute } from "../src/cli";

describe("cli", () => {
    it("should resolve when valid all files", () => {
        return execute([__dirname + "/fixtures/valid/*.yml"]);
    });
    it("should reject when invalid some files", () => {
        return execute([__dirname + "/fixtures/invalid/*.yml"]).then(
            () => assert.fail("SHOULD NOT CALLED"),
            (error) => {
                assert.ok(error instanceof Error);
            }
        );
    });
});
