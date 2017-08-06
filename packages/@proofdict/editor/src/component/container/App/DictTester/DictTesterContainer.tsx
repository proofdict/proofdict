import * as React from "react";
import { BaseContainer } from "../../BaseContainer";
import { DictTesterState } from "./DictTesterStore";
import { PrimaryButton, TextField } from "office-ui-fabric-react";
import { createUpdateDictionarySpecUseCase } from "../../../../use-case/dictionary/UpdateDictionarySpecUseCase";
import { DictFormState } from "../DictForm/DictFormStore";
import { Grid } from "../../../ui-kit/Grid/Grid";
import GridCell from "../../../ui-kit/Grid/GridCell";
import { createAddNewSpecToDictionaryUseCase } from "../../../../use-case/dictionary/AddNewSpecToDictionaryUseCase";

export class DictTesterContainer extends BaseContainer<{
    dictForm: DictFormState;
    dictTester: DictTesterState;
},
    {}> {
    createTestPatterns = () => {
        return this.props.dictTester.inputs.map((input, index) => {
            const onChangeTestPattern = (newValue: string) => {
                this.useCase(createUpdateDictionarySpecUseCase()).executor(useCase =>
                    useCase.execute(this.props.dictForm.dictionaryId, input, newValue)
                );
            };
            const result = this.props.dictTester.hasOutput(index) ? this.props.dictTester.getOutput(index) : "No data";
            return (
                <Grid key={index}>
                    <GridCell col="6of12">
                        <TextField defaultValue={input} onChanged={onChangeTestPattern}/>
                    </GridCell>
                    <GridCell col="6of12">
                    <span className="DictTesterContainer-expected">
                        {result}
                    </span>
                    </GridCell>
                </Grid>
            );
        });
    };

    private onClickAddNewPattern = () => {
        this.useCase(createAddNewSpecToDictionaryUseCase()).executor(useCase => useCase.execute(
            this.props.dictForm.dictionaryId
        ));
    };

    render() {
        const testPatterns = this.createTestPatterns();
        return (
            <div className="DictTesterContainer">
                <h2>Test Patterns</h2>
                {testPatterns}

                <PrimaryButton
                    iconProps={{ iconName: "Add" }}
                    text="Add New test pattern"
                    onClick={this.onClickAddNewPattern}
                />
            </div>
        );
    }
}
