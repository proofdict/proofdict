import * as React from "react";
import { TextField } from "office-ui-fabric-react";
import { DictMetaState } from "./DictMetaStore";
import { BaseContainer } from "../../BaseContainer";
import { createUpdateDictionaryDescriptionUseCase } from "../../../../use-case/dictionary/UpdateDictionaryDescriptionUseCase";
import { DictFormState } from "../DictForm/DictFormStore";
import { TagInput } from "../../../project/TagInput/TagInput";
import { createUpdateDictionaryTagsUseCase } from "../../../../use-case/dictionary/UpdateDictionaryTagsUseCase";

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
    private onChangedTags = (tags: string[]) => {
        this.useCase(createUpdateDictionaryTagsUseCase()).executor(useCase =>
            useCase.execute(this.props.dictForm.dictionaryId, tags)
        );
    };

    render() {
        return (
            <div className="DictMetaContainer">
                <h2>Description and Tags(Optional)</h2>
                <TextField
                    placeholder="Description of the word"
                    value={this.props.dictMeta.description}
                    onChanged={this.onChangedDescription}
                />
                <TagInput
                    suggestedTags={this.props.dictMeta.suggestTags}
                    selectedTags={this.props.dictMeta.selectedTags}
                    onChangeTags={this.onChangedTags}
                />
            </div>
        );
    }
}
