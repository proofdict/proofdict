// MIT © 2017 azu
import { StoreGroup } from "almin";
import { DictFormStore } from "./DictForm/DictFormStore";
import { dictionaryRepository } from "../../../infra/repository/DictionaryRepository";
import { DictTesterStore } from "./DictTester/DictTesterStore";

if (process.env.NODE_ENV !== "production") {
    (window as any).profdict = {
        dictionaryRepository
    };
}

export const appStoreGroup = new StoreGroup({
    dictForm: new DictFormStore({
        dictionaryRepository
    }),
    dictTester: new DictTesterStore({
        dictionaryRepository
    })
});