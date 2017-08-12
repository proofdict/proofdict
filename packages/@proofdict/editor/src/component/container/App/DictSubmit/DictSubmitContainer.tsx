// MIT © 2017 azu
import * as React from "react";
import { PrimaryButton } from "office-ui-fabric-react";
import { createSubmitDictionaryToGitHubUseCase } from "../../../../use-case/output/SubmitDictionaryToGitHubUseCase";
import { BaseContainer } from "../../BaseContainer";
import { DictFormState } from "../DictForm/DictFormStore";
import { HelpCalloutButton } from "../../../project/HelpCalloutButton/HelpCalloutButton";

require("./DictSubmitContainer.css");

export interface DictSubmitContainerProps {
    dictForm: DictFormState;
}

export class DictSubmitContainer extends BaseContainer<DictSubmitContainerProps, {}> {
    private onClickSubmitButton = () => {
        this.useCase(createSubmitDictionaryToGitHubUseCase()).executor(useCase =>
            useCase.execute(this.props.dictForm.dictionaryId)
        );
    };
    private createSubmitButtonHelp = () => {
        return (
            <HelpCalloutButton>
                <div className="DictSubmitContainer-help">
                    <h2>What is this?</h2>
                    <p>You can submit your term to proofdict project.</p>
                    <ul style={{ listStyleType: "decimal " }}>
                        <li>Press "Submit to GitHub"</li>
                        <li>
                            <a href="https://help.github.com/articles/creating-new-files/">Creating new files</a>
                        </li>
                        <li>
                            Send a <a href="https://help.github.com/articles/about-pull-requests/">pull requests</a>
                        </li>
                    </ul>
                    <p>
                        <a href="https://proofdict.github.io/proofdict/">proofdict dictionary is here</a>
                    </p>
                </div>
            </HelpCalloutButton>
        );
    };

    render() {
        return (
            <div className="DictSubmitContainer">
                <div className="DictSubmitContainer-right">
                    {this.createSubmitButtonHelp()}
                    <PrimaryButton className="DictSubmitContainer-submitButton" onClick={this.onClickSubmitButton}>
                        Submit to GitHub
                    </PrimaryButton>
                </div>
            </div>
        );
    }
}
