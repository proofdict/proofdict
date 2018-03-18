import { ProofdictRule } from "@proofdict/tester";
export declare const assertProofdictJSON: (dictionary: ProofdictRule[]) => Promise<void[][]>;
/**
 * Assert each json
 */
export declare const assertJSON: (filePath: string) => Promise<void[][]>;
/**
 * Assert: Each dictionary
 */
export declare const assertYAML: (filePath: string) => Promise<void[][]> | undefined;
