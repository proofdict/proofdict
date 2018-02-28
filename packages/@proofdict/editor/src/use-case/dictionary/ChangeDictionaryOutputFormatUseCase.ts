// MIT © 2017 azu
import { Payload, UseCase } from "almin";
import { DictOutputFormat } from "../../component/container/App/DictOutput/DictOutputStore";

export const createChangeDictionaryOutputFormatUseCase = () => {
    return new ChangeDictionaryOutputFormatUseCase();
};

export class ChangeDictionaryOutputFormatUseCasePayload extends Payload {
    readonly type = "ChangeDictionaryOutputFormatUseCase";
    constructor(public format: DictOutputFormat) {
        super();
    }
}

export class ChangeDictionaryOutputFormatUseCase extends UseCase {
    execute(format: DictOutputFormat) {
        this.dispatch(new ChangeDictionaryOutputFormatUseCasePayload(format));
    }
}
