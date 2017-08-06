import * as React from "react";
import { BaseContainer } from "../../BaseContainer";
import { DictTesterState } from "./DictTesterStore";
import { TextField } from "office-ui-fabric-react";
import { createUpdateDictionarySpecUseCase } from "../../../../use-case/dictionary/UpdateDictionarySpecUseCase";
import { DictFormState } from "../DictForm/DictFormStore";

export class DictTesterContainer extends BaseContainer<
    {
        dictForm: DictFormState;
        dictTester: DictTesterState;
    },
    {}
> {
    createTestPatterns = () => {
        return this.props.dictTester.inputs.map((input, index) => {
            const onChangeTestPattern = (newValue: string) => {
                this.useCase(createUpdateDictionarySpecUseCase()).executor(useCase =>
                    useCase.execute(this.props.dictForm.dictionaryId, input, newValue)
                );
            };
            const result = this.props.dictTester.hasOutput(index) ? this.props.dictTester.getOutput(index) : "No data";
            return (
                <div key={index}>
                    <TextField label="Test pattern" defaultValue={input} onChanged={onChangeTestPattern} />
                    <span className="DictTesterContainer-expected">
                        {result}
                    </span>
                </div>
            );
        });
    };

    render() {
        const testPatterns = this.createTestPatterns();
        return (
            <div className="DictTesterContainer">
                {testPatterns}
            </div>
        );
    }
}
