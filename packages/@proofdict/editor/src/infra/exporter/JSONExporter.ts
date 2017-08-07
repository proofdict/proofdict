// MIT © 2017 azu
import { Dictionary } from "../../domain/Dictionary";

export interface dictionaryJSON {
    id: string;
    expect: string;
    patterns: string[];
    specs: {
        actual: string;
        expected: string;
    }[];

}

export function exportToJSON(dictionary: Dictionary) {

}