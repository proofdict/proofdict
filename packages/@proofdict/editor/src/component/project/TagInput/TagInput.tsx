import * as React from "react";

const { Creatable } = require("react-select");
import "react-select/dist/react-select.css";

export interface TagInputProps {
    tags: string[];
    selectedTags: string[];
    onChangeTags: (tags: string[]) => void;
}

type SelectOption = {
    label: string;
    value: string;
};

export class TagInput extends React.Component<TagInputProps, {}> {
    private logChange = (values: SelectOption[]): void => {
        const tags = values.map(val => val.value);
        this.props.onChangeTags(tags);
    };

    render() {
        const options: SelectOption[] = this.props.tags.map(tag => {
            return {
                label: tag,
                value: tag
            };
        });
        // tags[]
        const selectedTagValue = this.props.selectedTags.join(",");

        return (
            <Creatable
                className="TagInput"
                name="form-field-name"
                value={selectedTagValue}
                options={options}
                multi={true}
                placeholder="Input Tag(s)"
                onChange={this.logChange}
            />
        );
    }
}
