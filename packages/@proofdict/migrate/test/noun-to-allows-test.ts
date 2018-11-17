import { runSnapshot } from "./run-snapshot";
import * as path from "path";
import { migrate } from "../src/migrations/noun-to-allows";

describe("noun-to-allows", function() {
    runSnapshot(path.join(__dirname, "snapshots/noun-to-allows"), (content, filePath) => {
        return migrate(content, filePath);
    });
});
