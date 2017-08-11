import * as React from "react";
import { CommandBar } from "office-ui-fabric-react";
import { BaseContainer } from "../../BaseContainer";
import { createImportDictionaryFromJSONUseCase } from "../../../../use-case/dictionary/ImportDictionaryFromJSONUseCase";
import { createChangeDictionaryOutputFormatUseCase } from "../../../../use-case/dictionary/ChangeDictionaryOutputFormatUseCase";

import * as classNames from "classnames";

const ulid = require("ulid");

export interface AppMenuContainerProps {
    className?: string;
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
                        expected: "ECMAScript $1",
                        patterns: ["/ES (\\d+)/i", "/ES(\\d+)/i"],
                        specs: [
                            {
                                actual: "ES 5",
                                expected: "ECMAScript 5"
                            },
                            {
                                actual: "ES2015",
                                expected: "ECMAScript 2015"
                            }
                        ],
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
        }
    ];

    render() {
        return (
            <header className={classNames("AppMenuContainer", this.props.className)}>
                <CommandBar isSearchBoxVisible={false} items={this.menuItems} />
            </header>
        );
    }
}
