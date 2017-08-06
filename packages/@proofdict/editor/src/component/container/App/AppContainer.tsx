import * as React from "react";
import "./AppContainer.css";
import { appStoreGroup } from "./AppStoreGroup";
import { BaseContainer } from "../BaseContainer";
import { DictFormContainer } from "./DictForm/DictFormContainer";
import { DictTesterContainer } from "./DictTester/DictTesterContainer";

require("office-ui-fabric-react/dist/css/fabric.css");

export class AppContainer extends BaseContainer<typeof appStoreGroup.state, {}> {
    render() {
        return (
            <div className="App">
                <DictFormContainer dictForm={this.props.dictForm} />
                <DictTesterContainer dictForm={this.props.dictForm} dictTester={this.props.dictTester} />
            </div>
        );
    }
}
