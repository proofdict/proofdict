// MIT © 2017 azu
import { Engine } from "prh";
import { Dictionary } from "../../domain/Dictionary";
import { DictionarySpec } from "../../domain/DictionarySpec";

const intersectionBy = require("lodash.intersectionby");

export interface NormalizedToken {
    word_type: string; // 単語タイプ(辞書に登録されている単語ならKNOWN, 未知語ならUNKNOWN)
    surface_form: string; // 表層形
    pos: string; // 品詞
    pos_detail_1: string; // 品詞細分類1
    pos_detail_2: string; // 品詞細分類2
    pos_detail_3: string; // 品詞細分類3
    conjugated_type: string; // 活用型
    conjugated_form: string; // 活用形
    basic_form: string; // 基本形
    reading: string; // 読み
    pronunciation: string; // 発音
}

export interface RawToken {
    word_id: number; // 辞書内での単語ID
    word_type: string; // 単語タイプ(辞書に登録されている単語ならKNOWN, 未知語ならUNKNOWN)
    word_position: number; // 単語の開始位置
    surface_form: string; // 表層形
    pos: string; // 品詞
    pos_detail_1: string; // 品詞細分類1
    pos_detail_2: string; // 品詞細分類2
    pos_detail_3: string; // 品詞細分類3
    conjugated_type: string; // 活用型
    conjugated_form: string; // 活用形
    basic_form: string; // 基本形
    reading: string; // 読み
    pronunciation: string; // 発音
}

type GetTokenizer = (options?: { dicPath: string }) => Promise<{ tokenize: (text: string) => Array<RawToken> }>;
const getTokenizer: GetTokenizer = require("kuromojin").getTokenizer;

const isSafeRegExp = require("safe-regex");

export function normalizeToken(token: RawToken): NormalizedToken {
    return {
        word_type: token.word_type,
        surface_form: token.surface_form,
        pos: token.pos,
        pos_detail_1: token.pos_detail_1,
        pos_detail_2: token.pos_detail_2,
        pos_detail_3: token.pos_detail_3,
        conjugated_type: token.conjugated_type,
        conjugated_form: token.conjugated_form,
        basic_form: token.basic_form,
        reading: token.reading,
        pronunciation: token.pronunciation
    };
}

export function getUniqueTokens(dictionary: Dictionary): Promise<Array<NormalizedToken>> {
    const options = process.env.PUBLIC_URL ? { dicPath: `${process.env.PUBLIC_URL}/dict` } : undefined;
    return getTokenizer(options).then(tokenizer => {
        const results: Array<Array<any>> = [];
        results.push(tokenizer.tokenize(dictionary.expected.value));
        dictionary.specs.getFilledSpecList().forEach(spec => {
            const matchExpectedWords = getMatchExpectedWords(dictionary, spec);
            matchExpectedWords.forEach(word => {
                const tokens = tokenizer.tokenize(word);
                results.push(tokens);
            });
        });
        // filter by same order and same word
        return intersectionBy(...results, (word: RawToken) => {
            return `${word.word_id}-${word.word_position}-${word.surface_form}`;
        }).map((token: RawToken) => {
            return normalizeToken(token);
        });
    });
}

/**
 * test dictionary match the spec, and return the result matched words.
 */
export function getMatchExpectedWords(dictionary: Dictionary, spec: DictionarySpec): string[] {
    if (spec.actual.length === 0) {
        return [];
    }
    const patterns = dictionary.patterns.getPatternValuesWithoutEmpty();
    if (patterns.length === 0) {
        return [];
    }
    try {
        const engine = new Engine({
            version: 1,
            rules: patterns.map(pattern => {
                return {
                    expected: dictionary.expected.value,
                    pattern: pattern
                };
            })
        });

        engine.rules.forEach((rule, index) => {
            const source = rule.pattern.source;
            if (!isSafeRegExp(source)) {
                throw new Error(`${patterns[index]} is not safe regexp`);
            }
            if ("(?:)" === source) {
                throw new Error(`${patterns[index]} is not safe regexp`);
            }
        });
        const changeSet = engine.makeChangeSet("/web", spec.actual);
        return changeSet.diffs
            .map(diff => {
                return diff.matches[0].replace(diff.pattern, diff.expected!);
            })
            .filter(word => word !== undefined && word.length > 0);
    } catch (error) {
        return [];
    }
}

export function testPattern(dictionary: Dictionary, spec: DictionarySpec): DictionarySpec {
    if (spec.actual.length === 0) {
        return spec;
    }
    const patterns = dictionary.patterns.getPatternValuesWithoutEmpty();
    if (patterns.length === 0) {
        return spec;
    }
    try {
        const engine = new Engine({
            version: 1,
            rules: patterns.map(pattern => {
                return {
                    expected: dictionary.expected.value,
                    pattern: pattern
                };
            })
        });

        engine.rules.forEach((rule, index) => {
            const source = rule.pattern.source;
            if (!isSafeRegExp(source)) {
                throw new Error(`${patterns[index]} is not safe regexp`);
            }
            if ("(?:)" === source) {
                throw new Error(`${patterns[index]} is not safe regexp`);
            }
        });
        const expected = engine.replaceByRule("/web", spec.actual);
        return spec.updateExpected(expected);
    } catch (error) {
        return spec.invalid(error);
    }
}
