// MIT © 2017 azu
import { Payload, UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictOutputFormatType, formatDictionary } from "../../domain/Dictionary/DictionaryFormatter";

export const createChangeDictionaryOutputFormatUseCase = () => {
    return new ChangeDictionaryOutputFormatUseCase({
        dictionaryRepository
    });
};

export class ChangeDictionaryOutputFormatUseCasePayload extends Payload {
    readonly type = "ChangeDictionaryOutputFormatUseCase";

    constructor(public format: DictOutputFormatType, public output: string) {
        super();
    }
}

export class ChangeDictionaryOutputFormatUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(type: DictOutputFormatType) {
        const dictionary = this.repo.dictionaryRepository.get();
        this.dispatch(new ChangeDictionaryOutputFormatUseCasePayload(type, formatDictionary(dictionary, type)));
    }
}
