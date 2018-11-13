import * as React from "react";
import { DictOutputState } from "./DictOutputStore";

require("./DictOutputContainer.css");

export interface DictOutputProps {
    dictOutput: DictOutputState;
}

export class DictOutputContainer extends React.Component<DictOutputProps, {}> {
    render() {
        return (
            <div className="DictOutputContainer">
                <h2>Output</h2>
                <textarea
                    className="DictOutputContainer-textarea"
                    readOnly={true}
                    value={this.props.dictOutput.output}
                />
            </div>
        );
    }
}
