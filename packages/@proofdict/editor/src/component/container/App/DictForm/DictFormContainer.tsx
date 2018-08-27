import * as React from "react";
import { BaseContainer } from "../../BaseContainer";
import { DictFormState } from "./DictFormStore";
import { PrimaryButton, TextField } from "office-ui-fabric-react";
import { createUpdateDictionaryPatternUseCase } from "../../../../use-case/dictionary/UpdateDictionaryPatternUseCase";
import { createUpdateDictionaryExpectedUseCase } from "../../../../use-case/dictionary/UpdateDictionaryExpectedUseCase";
import { createAddNewPatternToDictionaryUseCase } from "../../../../use-case/dictionary/AddNewPatternToDictionaryUseCase";
import { HelpCalloutButton } from "../../../project/HelpCalloutButton/HelpCalloutButton";

require("./DictFormContainer.css");

export class DictFormContainer extends BaseContainer<{ dictForm: DictFormState }, {}> {
    onChangeExpect = (input: string) => {
        this.useCase(createUpdateDictionaryExpectedUseCase()).execute(this.props.dictForm.dictionaryId, input);
    };
    onClickAddNewPattern = () => {
        this.useCase(createAddNewPatternToDictionaryUseCase()).execute(this.props.dictForm.dictionaryId);
    };

    render() {
        const patterns = this.createPatterns();
        return (
            <div className="DictFormContainer">
                <h2>Expected: {this.createExpectedHelp()}</h2>
                <p className="DictFormContainer-description">1. Input expected result</p>
                <TextField
                    placeholder="e.g.) ECMAScript $1"
                    value={this.props.dictForm.expected}
                    onChanged={this.onChangeExpect}
                />
                {patterns}
            </div>
        );
    }

    private createExpectedHelp = () => {
        return (
            <HelpCalloutButton>
                <div className="DictFormContainer-expectedHelp">
                    <p>
                        Expected allow to use string or regexp replace symbol<b>$0-$1</b>
                    </p>
                    <ul>
                        <li>
                            Pattern: <code>/(\w+)\s(\w+)/</code>
                        </li>
                        <li>
                            Expected:<code>$2 = $1</code>
                        </li>
                        <li>
                            Input: <b>John Smith</b>
                        </li>
                        <li>
                            Output:<b>Smith = John</b>
                        </li>
                    </ul>
                    <p>
                        If you want to know RegExp, please see{" "}
                        <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp">
                            MDN
                        </a>
                    </p>
                </div>
            </HelpCalloutButton>
        );
    };
    private createPatternsHelp = () => {
        return (
            <HelpCalloutButton>
                <div className="DictFormContainer-patternsHelp">
                    <p>Patterns allow to use string or regexp-like string.</p>
                    <ul>
                        <li>
                            <code>pattern</code> only match <b>pattern</b>
                        </li>
                        <li>
                            <code>/pattern/i</code> match <b>pattern</b> and <b>PATTERN</b> etc..
                        </li>
                        <li>
                            <code>/\w+/i</code> match <b>a</b> and <b>ab</b> etc..
                        </li>
                    </ul>
                    <p>
                        If you want to know RegExp, please see{" "}
                        <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp">
                            MDN
                        </a>
                    </p>
                </div>
            </HelpCalloutButton>
        );
    };

    private createPatterns() {
        const patterns = this.props.dictForm.patterns.map((expect, index) => {
            const onChangeExpect = (input: string) => {
                this.useCase(createUpdateDictionaryPatternUseCase()).execute(
                    this.props.dictForm.dictionaryId,
                    expect,
                    input
                );
            };
            return (
                <TextField
                    key={index}
                    placeholder="e.g.) /ECMAScript([0-9]+)/i"
                    value={expect}
                    onChanged={onChangeExpect}
                />
            );
        });
        return (
            <div>
                <h2>Patterns: {this.createPatternsHelp()}</h2>
                <p className="DictFormContainer-description">2. Input match patterns</p>

                {patterns}
                <PrimaryButton
                    tabIndex={-1}
                    iconProps={{ iconName: "Add" }}
                    text="Add New pattern"
                    onClick={this.onClickAddNewPattern}
                />
            </div>
        );
    }
}
