import * as React from "react";
import { TextField } from "office-ui-fabric-react";
import { DictMetaState } from "./DictMetaStore";
import { BaseContainer } from "../../BaseContainer";
import { createUpdateDictionaryDescriptionUseCase } from "../../../../use-case/dictionary/UpdateDictionaryDescriptionUseCase";
import { DictFormState } from "../DictForm/DictFormStore";

export interface DictDescriptionContainerProps {
    dictMeta: DictMetaState;
    dictForm: DictFormState;
}

export class DictMetaContainer extends BaseContainer<DictDescriptionContainerProps, {}> {
    private onChangedDescription = (newValue: string) => {
        this.useCase(createUpdateDictionaryDescriptionUseCase()).executor(useCase =>
            useCase.execute(this.props.dictForm.dictionaryId, newValue)
        );
    };

    render() {
        return (
            <div className="DictMetaContainer">
                <h2>Description(Optional)</h2>
                <TextField
                    placeholder="Description of the word"
                    value={this.props.dictMeta.description}
                    onChanged={this.onChangedDescription}
                />
            </div>
        );
    }
}
