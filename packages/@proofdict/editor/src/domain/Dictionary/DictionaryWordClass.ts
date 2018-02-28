// MIT © 2017 azu
export interface DictionaryWordClassJSON {
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

export class DictionaryWordClass {
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

    constructor(props: DictionaryWordClassJSON) {
        this.word_type = props.word_type;
        this.surface_form = props.surface_form;
        this.pos = props.pos;
        this.pos_detail_1 = props.pos_detail_1;
        this.pos_detail_2 = props.pos_detail_2;
        this.pos_detail_3 = props.pos_detail_3;
        this.conjugated_type = props.conjugated_type;
        this.conjugated_form = props.conjugated_form;
        this.basic_form = props.basic_form;
        this.reading = props.reading;
        this.pronunciation = props.pronunciation;
    }

    toJSON(): DictionaryWordClassJSON {
        return Object.assign({}, this);
    }
}
