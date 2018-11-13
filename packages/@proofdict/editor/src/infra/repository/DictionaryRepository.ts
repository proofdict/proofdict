// MIT © 2017 azu
import { Dictionary } from "../../domain/Dictionary/Dictionary";
import { NonNullableRepository } from "ddd-base";
import { createDictionary } from "../../domain/Dictionary/DictionaryFactory";

export class DictionaryRepository extends NonNullableRepository<Dictionary> {}

export const dictionaryRepository = new DictionaryRepository(createDictionary());
