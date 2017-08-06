// MIT © 2017 azu
import { UseCase } from "almin";
import { dictionaryRepository, DictionaryRepository } from "../../infra/repository/DictionaryRepository";
import { DictionaryIdentifier } from "../../domain/Dictionary";
import { testPattern } from "../../infra/prh/Prh";

export const createTestPatternExampleUseCase = () => {
    return new TestPatternExampleUseCase({
        dictionaryRepository
    });
};

export class TestPatternExampleUseCase extends UseCase {
    constructor(private repo: { dictionaryRepository: DictionaryRepository }) {
        super();
    }

    execute(id: DictionaryIdentifier, testInput: string) {
        const dictionary = this.repo.dictionaryRepository.findById(id);
        if (!dictionary) {
            throw new Error(`Not found dictionary:${id}`);
        }
        testPattern(dictionary, testInput);
    }
}
