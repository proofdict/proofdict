import * as React from "react";
import { BaseContainer } from "../../BaseContainer";
import { DictTesterState } from "./DictTesterStore";
import { TextField } from "office-ui-fabric-react";

export class DictTesterContainer extends BaseContainer<DictTesterState, {}> {
    render() {
        return (
            <div className="DictTesterContainer">
                <TextField label="Test pattern" />
                <div className="DictTester-result">
                    <h3>Result:</h3>
                    {this.props.input}
                </div>
            </div>
        );
    }
}
