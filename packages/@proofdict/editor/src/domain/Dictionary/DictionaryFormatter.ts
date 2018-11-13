import { Dictionary, DictionarySerializer } from "./Dictionary";
import { prhFormatter } from "../../infra/formatter/PrhFormatter";
import { jsonFormatter } from "../../infra/formatter/JSONFormatter";
import { yamlFormatter } from "../../infra/formatter/YamlFormatter";

export type DictOutputFormatType = "json" | "yml" | "prh";

export function formatDictionary(dictionary: Dictionary, format: DictOutputFormatType): string {
    if (format === "json") {
        return jsonFormatter(DictionarySerializer.toJSON(dictionary));
    } else if (format === "yml") {
        return yamlFormatter(DictionarySerializer.toJSON(dictionary));
    } else if (format === "prh") {
        return prhFormatter(DictionarySerializer.toJSON(dictionary));
    }
    throw new Error(`Dictionary does not support format:${format}`);
}
