import type { RuleOption } from "../RuleOptions";
import type { Proofdict } from "@proofdict/tester";
import { MODE } from "../mode";

export default (_options: RuleOption, mode: MODE): Proofdict | undefined => {
    if (mode === MODE.LOCAL) {
        throw new Error("Local mode does not work on browser");
    }
    return;
};
