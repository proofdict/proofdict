import * as React from "react";
import { BaseContainer } from "../../BaseContainer";
import { DictTesterState } from "./DictTesterStore";
import { PrimaryButton, TextField } from "office-ui-fabric-react";
import { createUpdateDictionarySpecUseCase } from "../../../../use-case/dictionary/UpdateDictionarySpecUseCase";
import { DictFormState } from "../DictForm/DictFormStore";
import { Grid } from "../../../ui-kit/Grid/Grid";
import GridCell from "../../../ui-kit/Grid/GridCell";
import { createAddNewSpecToDictionaryUseCase } from "../../../../use-case/dictionary/AddNewSpecToDictionaryUseCase";

require("./DictTesterContainer.css");

export class DictTesterContainer extends BaseContainer<
    {
        dictForm: DictFormState;
        dictTester: DictTesterState;
    },
    {}
> {
    createTestPatterns = () => {
        return this.props.dictTester.inputs.map((input, index) => {
            const onChangeTestPattern = (event: any, newValue?: string) => {
                this.useCase(createUpdateDictionarySpecUseCase()).execute(
                    this.props.dictForm.dictionaryId,
                    input,
                    newValue
                );
            };
            const result = this.props.dictTester.hasOutput(index) ? this.props.dictTester.getOutput(index) : "No data";
            return (
                <Grid key={index} className="DictTesterContainer-inputOutputGrid">
                    <GridCell col="6of12" className="DictTesterContainer-inputCell">
                        <TextField placeholder="Any test string" value={input} onChange={onChangeTestPattern} />
                    </GridCell>
                    <GridCell col="6of12" className="DictTesterContainer-outputCell">
                        <p className="DictTesterContainer-expected">{result}</p>
                    </GridCell>
                </Grid>
            );
        });
    };

    private onClickAddNewPattern = () => {
        this.useCase(createAddNewSpecToDictionaryUseCase()).execute(this.props.dictForm.dictionaryId);
    };

    render() {
        const testPatterns = this.createTestPatterns();
        return (
            <div className="DictTesterContainer">
                <h2>Test Patterns</h2>
                <p className="DictTesterContainer-description">3. Add test patterns and check the output is correct.</p>
                <Grid className="DictTesterContainer-headerGrid">
                    <GridCell col="6of12" className="DictTesterContainer-headerCell">
                        <span>Input</span>
                    </GridCell>
                    <GridCell col="6of12" className="DictTesterContainer-headerCell">
                        <span>Output</span>
                    </GridCell>
                </Grid>
                {testPatterns}

                <PrimaryButton
                    tabIndex={-1}
                    iconProps={{ iconName: "Add" }}
                    text="Add New test pattern"
                    onClick={this.onClickAddNewPattern}
                />
            </div>
        );
    }
}
