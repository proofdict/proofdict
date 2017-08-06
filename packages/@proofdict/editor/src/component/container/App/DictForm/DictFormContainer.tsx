import * as React from "react";
import { BaseContainer } from "../../BaseContainer";
import { DictFormState } from "./DictFormStore";
import { PrimaryButton, TextField } from "office-ui-fabric-react";
import { createUpdateDictionaryPatternUseCase } from "../../../../use-case/dictionary/UpdateDictionaryPatternUseCase";
import { createUpdateDictionaryExpectedUseCase } from "../../../../use-case/dictionary/UpdateDictionaryExpectedUseCase";
import { createAddNewPatternToDictionaryUseCase } from "../../../../use-case/dictionary/AddNewPatternToDictionaryUseCase";

export class DictFormContainer extends BaseContainer<{ dictForm: DictFormState }, {}> {
    onChangeExpect = (input: string) => {
        this.useCase(createUpdateDictionaryExpectedUseCase()).executor(useCase =>
            useCase.execute(this.props.dictForm.dictionaryId, input)
        );
    };
    onClickAddNewPattern = () => {
        this.useCase(createAddNewPatternToDictionaryUseCase()).executor(useCase =>
            useCase.execute(this.props.dictForm.dictionaryId)
        );
    };

    render() {
        const patterns = this.createPatterns();
        return (
            <div className="DictFormContainer">
                <h2>Expected:</h2>
                <TextField defaultValue={this.props.dictForm.expect} onChanged={this.onChangeExpect}/>
                {patterns}
            </div>
        );
    }

    private createPatterns() {
        const patterns = this.props.dictForm.patterns.map((expect, index) => {
            const onChangeExpect = (input: string) => {
                this.useCase(createUpdateDictionaryPatternUseCase()).executor(useCase =>
                    useCase.execute(this.props.dictForm.dictionaryId, expect, input)
                );
            };
            return <TextField key={index} defaultValue={expect} onChanged={onChangeExpect}/>;
        });
        return (
            <div>
                <h2>Patterns:</h2>
                {patterns}
                <PrimaryButton
                    iconProps={{ iconName: "Add" }}
                    text="Add New pattern"
                    onClick={this.onClickAddNewPattern}
                />
            </div>
        );
    }
}
