import * as React from "react";
import { BaseContainer } from "../../BaseContainer";
import { DictFormState } from "./DictFormStore";
import { PrimaryButton, TextField } from "office-ui-fabric-react";
import { createUpdateDictionaryExpectedUseCase } from "../../../../use-case/dictionary/UpdateDictionaryExpectedUseCase";
import { createUpdateDictionaryPatternUseCase } from "../../../../use-case/dictionary/UpdateDictionaryPatternUseCase";
import { createAddNewExpectToDictionaryUseCase } from "../../../../use-case/dictionary/AddNewExpectToDictionaryUseCase";

export class DictFormContainer extends BaseContainer<{ dictForm: DictFormState }, {}> {
    onChangePattern = (input: string) => {
        this.useCase(createUpdateDictionaryPatternUseCase()).executor(useCase =>
            useCase.execute(this.props.dictForm.dictionaryId, input)
        );
    };
    onClickAddNewExpect = () => {
        this.useCase(createAddNewExpectToDictionaryUseCase()).executor(useCase =>
            useCase.execute(this.props.dictForm.dictionaryId)
        );
    };

    render() {
        const expected = this.createExpected();
        return (
            <div className="DictFormContainer">
                <TextField
                    label="Pattern"
                    defaultValue={this.props.dictForm.pattern}
                    onChanged={this.onChangePattern}
                />
                {expected}
            </div>
        );
    }

    private createExpected() {
        const expectes = this.props.dictForm.expects.map((expect, index) => {
            const onChangeExpect = (input: string) => {
                this.useCase(createUpdateDictionaryExpectedUseCase()).executor(useCase =>
                    useCase.execute(this.props.dictForm.dictionaryId, expect, input)
                );
            };
            return <TextField key={index} defaultValue={expect} label="Expect" onChanged={onChangeExpect} />;
        });
        return (
            <div>
                {expectes}
                <PrimaryButton
                    iconProps={{ iconName: "Add" }}
                    text="Add New expect"
                    onClick={this.onClickAddNewExpect}
                />
            </div>
        );
    }
}
