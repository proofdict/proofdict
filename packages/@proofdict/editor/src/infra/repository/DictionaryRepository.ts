// MIT © 2017 azu
import { createDictionary, Dictionary } from "@proofdict/domain";
import { NonNullableRepository } from "ddd-base";

export class DictionaryRepository extends NonNullableRepository<Dictionary> {}

export const dictionaryRepository = new DictionaryRepository(createDictionary());
