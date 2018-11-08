import * as React from "react";

import { Creatable } from "react-select";
import { ValueType } from "react-select/lib/types";

export interface TagInputProps {
    suggestedTags: string[];
    selectedTags: string[];
    onChangeTags: (tags: string[]) => void;
}

type SelectOption = {
    label: string;
    value: string;
};

export class TagInput extends React.Component<TagInputProps, {}> {
    private logChange = (value: ValueType<SelectOption>): void => {
        if (value && Array.isArray(value)) {
            const tags = value.map(v => {
                return v.value;
            });
            this.props.onChangeTags(tags);
        } else {
            this.props.onChangeTags([]);
        }
    };

    render() {
        // All options that include current selected tags
        const options: SelectOption[] = [...this.props.suggestedTags, ...this.props.selectedTags].map(tag => {
            return {
                label: tag,
                value: tag
            };
        });
        // selected
        const selectedTagValue = this.props.selectedTags.map(tag => {
            return {
                label: tag,
                value: tag
            };
        });
        return (
            <Creatable
                className="TagInput"
                name="form-field-name"
                value={selectedTagValue}
                options={options}
                isMulti={true}
                placeholder="Input Tag(s)"
                onChange={this.logChange}
            />
        );
    }
}
