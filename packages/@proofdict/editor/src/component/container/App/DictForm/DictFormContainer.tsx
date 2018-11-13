import * as React from "react";
import { BaseContainer } from "../../BaseContainer";
import { DictFormState } from "./DictFormStore";
import { Checkbox, PrimaryButton, TextField } from "office-ui-fabric-react";
import { createUpdateDictionaryPatternUseCase } from "../../../../use-case/dictionary/UpdateDictionaryPatternUseCase";
import { createUpdateDictionaryExpectedUseCase } from "../../../../use-case/dictionary/UpdateDictionaryExpectedUseCase";
import { createAddNewPatternToDictionaryUseCase } from "../../../../use-case/dictionary/AddNewPatternToDictionaryUseCase";
import { HelpCalloutButton } from "../../../project/HelpCalloutButton/HelpCalloutButton";
import { DictionaryPattern } from "../../../../domain/Dictionary/DictionaryPattern";
import { DictionaryAllow } from "../../../../domain/Dictionary/DictionaryAllow";
import { createAddNewAllowToDictionaryUseCase } from "../../../../use-case/dictionary/AddNewAllowToDictionaryUseCase";
import { createUpdateDictionaryAllowUseCase } from "../../../../use-case/dictionary/UpdateDictionaryAllowUseCase";

require("./DictFormContainer.css");

export interface DictPatternProps {
    pattern: DictionaryPattern;
    onChangeInput: (event: React.FormEvent<HTMLElement | HTMLInputElement>, input?: string) => void;
    onChangeCheckbox: (event?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => void;
}

export function DictPattern(props: DictPatternProps) {
    return (
        <div className={"DictPattern"}>
            <TextField
                placeholder="e.g.) /ECMAScript([0-9]+)/i"
                value={props.pattern.trimWorkBoundary()}
                onChange={props.onChangeInput}
            />
            <Checkbox
                label="Wrap word boundary"
                disabled={!props.pattern.isRegExpLike}
                checked={props.pattern.hasWrappedWordBoundary}
                onChange={props.onChangeCheckbox}
            />
        </div>
    );
}

export interface DictAllowProps {
    allow: DictionaryAllow;
    onChangeInput: (event: React.FormEvent<HTMLElement | HTMLInputElement>, input?: string) => void;
}

export function DictAllow(props: DictAllowProps) {
    return (
        <div className={"DictAllow"}>
            <TextField placeholder="e.g.) /ECMAScript/i" value={props.allow.value} onChange={props.onChangeInput} />
        </div>
    );
}

export class DictFormContainer extends BaseContainer<{ dictForm: DictFormState }, {}> {
    onChangeExpect = (event: any, input?: string) => {
        if (input) {
            this.useCase(createUpdateDictionaryExpectedUseCase()).execute(this.props.dictForm.dictionaryId, input);
        }
    };
    onClickAddNewPattern = () => {
        this.useCase(createAddNewPatternToDictionaryUseCase()).execute(this.props.dictForm.dictionaryId);
    };
    onClickAddAllowPattern = (value?: string) => {
        this.useCase(createAddNewAllowToDictionaryUseCase()).execute(this.props.dictForm.dictionaryId, value);
    };

    render() {
        const patterns = this.createPatterns();
        const allows = this.createAllows();
        return (
            <div className="DictFormContainer">
                <h2>Expected: {this.createExpectedHelp()}</h2>
                <p className="DictFormContainer-description">1. Input expected result</p>
                <TextField
                    placeholder="e.g.) ECMAScript $1"
                    value={this.props.dictForm.expected}
                    onChange={this.onChangeExpect}
                />
                {patterns}
                {allows}
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
    private createAllowsHelp = () => {
        return (
            <HelpCalloutButton>
                <div className="DictFormContainer-allowsHelp">
                    <p>Allows defined ignoring pattern that is String or RegExp-like String</p>
                    <ul>
                        <li>
                            <code>allow</code> only match <b>allow</b>
                        </li>
                        <li>
                            <code>/allow/i</code> match <b>allow</b> and <b>allow</b> etc..
                        </li>
                        <li>
                            <code>/\w+/i</code> match <b>a</b> and <b>ab</b> etc..
                        </li>
                        <li>
                            <code>{`{{COMBINATION_WORD}}`}</code> is special keyword.
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
        const patterns = this.props.dictForm.patterns.map((pattern, index) => {
            const onChangeInput = (event: any, input: string = "") => {
                this.useCase(createUpdateDictionaryPatternUseCase()).execute(
                    this.props.dictForm.dictionaryId,
                    pattern.value,
                    input
                );
            };
            const onChangeCheckbox = (event?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
                if (checked) {
                    this.useCase(createUpdateDictionaryPatternUseCase()).execute(
                        this.props.dictForm.dictionaryId,
                        pattern.value,
                        pattern.addWordBoundary()
                    );
                } else {
                    this.useCase(createUpdateDictionaryPatternUseCase()).execute(
                        this.props.dictForm.dictionaryId,
                        pattern.value,
                        pattern.trimWorkBoundary()
                    );
                }
            };
            return (
                <DictPattern
                    key={index}
                    pattern={pattern}
                    onChangeInput={onChangeInput}
                    onChangeCheckbox={onChangeCheckbox}
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
                    text="Add pattern"
                    onClick={this.onClickAddNewPattern}
                />
            </div>
        );
    }

    private createAllows() {
        const allows = this.props.dictForm.allows.map((allow, index) => {
            const onChangeInput = (event: any, input: string = "") => {
                this.useCase(createUpdateDictionaryAllowUseCase()).execute(
                    this.props.dictForm.dictionaryId,
                    allow.value,
                    input
                );
            };
            return <DictAllow key={index} allow={allow} onChangeInput={onChangeInput} />;
        });
        return (
            <div>
                <h2>Allows: {this.createAllowsHelp()}</h2>
                <p className="DictFormContainer-description">2-B. Input allow pattern(Optional)</p>

                {allows}
                <PrimaryButton
                    tabIndex={-1}
                    iconProps={{ iconName: "Add" }}
                    text="Add allow pattern"
                    menuProps={{
                        items: [
                            {
                                key: "empty",
                                text: "Add empty filed",
                                iconProps: { iconName: "FieldEmpty" },
                                onClick: () => {
                                    this.onClickAddAllowPattern();
                                }
                            },
                            {
                                key: "{{COMBINATION_WORD}}",
                                text: "Add {{COMBINATION_WORD}}",
                                iconProps: { iconName: "LocaleLanguage" },
                                onClick: () => {
                                    this.onClickAddAllowPattern("{{COMBINATION_WORD}}");
                                }
                            }
                        ]
                    }}
                />
            </div>
        );
    }
}
