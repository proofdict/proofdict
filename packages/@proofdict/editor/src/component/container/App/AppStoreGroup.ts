// MIT © 2017 azu
import { StoreGroup } from "almin";
import { dictionaryRepository } from "../../../infra/repository/DictionaryRepository";
import { sourceRepoRepository } from "../../../infra/repository/SourceRepoRepository";
import { DictFormStore } from "./DictForm/DictFormStore";
import { DictTesterStore } from "./DictTester/DictTesterStore";
import { DictOutputStore } from "./DictOutput/DictOutputStore";
import { DictMetaStore } from "./DictMeta/DictMetaStore";
import { DictSubmitStore } from "./DictSubmit/DictSubmitStore";

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
    }),
    dictOutput: new DictOutputStore({
        dictionaryRepository
    }),
    dictMeta: new DictMetaStore({
        dictionaryRepository
    }),
    dictSubmit: new DictSubmitStore({
        sourceRepoRepository
    })
});
