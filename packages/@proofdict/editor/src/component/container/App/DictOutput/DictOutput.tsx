import * as React from "react";
import { DictOutputState } from "./DictOutputStore";

require("./DictOutput.css");

export interface DictOutputProps {
    dictOutput: DictOutputState;
}

export class DictOutput extends React.Component<DictOutputProps, {}> {
    render() {
        return (
            <div className="DictOutput">
                <h2>Output</h2>
                <textarea className="DictOutput-textarea" readOnly={true} value={this.props.dictOutput.output} />
            </div>
        );
    }
}
