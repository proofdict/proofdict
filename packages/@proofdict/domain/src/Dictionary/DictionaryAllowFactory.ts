import { DictionaryAllow } from "./DictionaryAllow";

export const createAllow = (value: string) => {
    return new DictionaryAllow({
        value: value,
    });
};

export const createCombinationWordAllow = () => {
    return new DictionaryAllow({
        value: "{{COMBINATION_WORD}}",
    });
};
