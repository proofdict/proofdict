// MIT © 2017 azu
import { Dictionary } from "../../domain/Dictionary";
import { NonNullableBaseRepository } from "../../ddd-base/NonNullableBaseRepository";
import { createDictionary } from "../../domain/DictionaryFactory";

export class DictionaryRepository extends NonNullableBaseRepository<Dictionary> {}

export const dictionaryRepository = new DictionaryRepository(createDictionary());
