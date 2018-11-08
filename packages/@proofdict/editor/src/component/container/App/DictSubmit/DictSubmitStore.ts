import { Store } from "almin";
import { SourceRepoRepository } from "../../../../infra/repository/SourceRepoRepository";
import { RepositorySavedEvent } from "ddd-base";
import { SourceRepo } from "../../../../domain/SourceRepo/SourceRepo";

export interface DictSubmitState {
    disabled: boolean;
}

export class DictSubmitStore extends Store<DictSubmitState> {
    state: DictSubmitState;

    getState(): DictSubmitState {
        return this.state;
    }

    constructor(public repo: { sourceRepoRepository: SourceRepoRepository }) {
        super();
        this.state = {
            disabled: repo.sourceRepoRepository.get() === undefined
        };
        repo.sourceRepoRepository.events.onSave(this.onSave);
    }

    onSave = (event: RepositorySavedEvent<SourceRepo>) => {
        this.setState({
            disabled: event.entity === undefined
        });
    };
}
