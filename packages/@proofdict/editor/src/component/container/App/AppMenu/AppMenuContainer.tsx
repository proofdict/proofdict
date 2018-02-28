import * as React from "react";
import * as classNames from "classnames";
import { CommandBar } from "office-ui-fabric-react";
import { BaseContainer } from "../../BaseContainer";
import { createImportDictionaryFromJSONUseCase } from "../../../../use-case/dictionary/ImportDictionaryFromJSONUseCase";
import { createChangeDictionaryOutputFormatUseCase } from "../../../../use-case/dictionary/ChangeDictionaryOutputFormatUseCase";
import { DictFormState } from "../DictForm/DictFormStore";
import { createResetDictionaryUseCase } from "../../../../use-case/dictionary/ResetDictionaryUseCase";

import { ulid } from "ulid";

export interface AppMenuContainerProps {
    className?: string;
    dictForm: DictFormState;
}

export class AppMenuContainer extends BaseContainer<AppMenuContainerProps, {}> {
    menuItems = [
        {
            key: "newItem",
            name: "Import example",
            icon: "Upload",
            ariaLabel: "Import example",
            onClick: () => {
                return this.useCase(createImportDictionaryFromJSONUseCase()).executor(useCase =>
                    useCase.execute({
                        id: ulid(),
                        description: "ECMAScript and version has a space.",
                        expected: "ECMAScript $1",
                        patterns: ["/ES (\\d+)/i", "/ES(\\d+)/i"],
                        specs: [
                            {
                                from: "ES 5",
                                to: "ECMAScript 5"
                            },
                            {
                                from: "ES2015",
                                to: "ECMAScript 2015"
                            }
                        ],
                        tags: ["JavaScript"],
                        wordClasses: []
                    })
                );
            }
        },
        {
            key: "format",
            name: "Output format",
            icon: "Code",
            ariaLabel: "Change output format",
            ["data-automation-id"]: "newItemMenu",
            subMenuProps: {
                items: [
                    {
                        key: "json",
                        name: "JSON",
                        onClick: () => {
                            return this.useCase(createChangeDictionaryOutputFormatUseCase()).executor(useCase =>
                                useCase.execute("json")
                            );
                        }
                    },
                    {
                        key: "yml",
                        name: "YAML",
                        onClick: () => {
                            return this.useCase(createChangeDictionaryOutputFormatUseCase()).executor(useCase =>
                                useCase.execute("yml")
                            );
                        }
                    },
                    {
                        key: "prh",
                        name: "prh",
                        onClick: () => {
                            return this.useCase(createChangeDictionaryOutputFormatUseCase()).executor(useCase =>
                                useCase.execute("prh")
                            );
                        }
                    }
                ]
            }
        },

        {
            key: "about",
            name: "About",
            icon: "Info",
            ariaLabel: "About proofdict",
            onClick: () => {
                location.href = "https://proofdict.github.io/proofdict/about/";
            }
        }
    ];
    farItems = [
        {
            key: "reset",
            name: "Reset input",
            icon: "Clear",
            ariaLabel: "Reset input data",
            onClick: () => {
                return this.useCase(createResetDictionaryUseCase()).executor(useCase =>
                    useCase.execute(this.props.dictForm.dictionaryId)
                );
            }
        }
    ];

    render() {
        return (
            <header className={classNames("AppMenuContainer", this.props.className)}>
                <CommandBar isSearchBoxVisible={false} items={this.menuItems} farItems={this.farItems} />
            </header>
        );
    }
}
