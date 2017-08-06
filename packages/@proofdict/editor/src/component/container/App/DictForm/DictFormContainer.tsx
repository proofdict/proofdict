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
        const expected = this.createExpected();
        return (
            <div className="DictFormContainer">
                <TextField label="Pattern" defaultValue={this.props.dictForm.expect} onChanged={this.onChangeExpect} />
                {expected}
            </div>
        );
    }

    private createExpected() {
        const patterns = this.props.dictForm.patterns.map((expect, index) => {
            const onChangeExpect = (input: string) => {
                this.useCase(createUpdateDictionaryPatternUseCase()).executor(useCase =>
                    useCase.execute(this.props.dictForm.dictionaryId, expect, input)
                );
            };
            return <TextField key={index} defaultValue={expect} label="Expect" onChanged={onChangeExpect} />;
        });
        return (
            <div>
                {patterns}
                <PrimaryButton
                    iconProps={{ iconName: "Add" }}
                    text="Add New expect"
                    onClick={this.onClickAddNewPattern}
                />
            </div>
        );
    }
}
