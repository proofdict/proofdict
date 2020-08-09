import { kvsEnvStorage } from "@kvs/env";
import { Proofdict } from "@proofdict/tester";

type StorageSchema = {
    proofdict: Proofdict;
    "proofdict-lastUpdated": number;
};
const storage = kvsEnvStorage<StorageSchema>({
    name: "prooddict",
    version: 1,
});
export const openStorage = () => {
    return storage;
};
