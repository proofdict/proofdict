import { Store } from "almin";
import { SourceRepoRepository } from "../../../../infra/repository/SourceRepoRepository";
import { createHooks } from "../../../../hooks/almin-hook";

export interface DictSubmitState {
    disabled: boolean;
}

export class DictSubmitStore extends Store<DictSubmitState> {
    state: DictSubmitState;

    getState(): DictSubmitState {
        return this.state;
    }

    constructor(repo: { sourceRepoRepository: SourceRepoRepository }) {
        super();
        this.state = {
            disabled: repo.sourceRepoRepository.get() === undefined
        };
        const { useEntity } = createHooks(this, [repo.sourceRepoRepository]);
        useEntity((state, [sourceRepo]) => {
            this.setState({
                disabled: sourceRepo !== undefined
            });
        });
    }
}
