import * as React from "react";
import { Creatable } from "react-select";
import "react-select/dist/react-select.css";

export interface TagInputProps {
    tags: string[];
    selectedTags: string[];
    onChangeTags: (tags: string[]) => void;
}

export class TagInput extends React.Component<TagInputProps, {}> {
    private logChange = (values: { label: string; value: string }[]) => {
        const tags = values.map(val => val.value);
        this.props.onChangeTags(tags);
    };

    render() {
        const options = this.props.tags.map(tag => {
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
