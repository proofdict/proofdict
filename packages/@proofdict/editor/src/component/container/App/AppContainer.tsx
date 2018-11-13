import * as React from "react";
import "./AppContainer.css";
import { appStoreGroup } from "./AppStoreGroup";
import { BaseContainer } from "../BaseContainer";
import { DictFormContainer } from "./DictForm/DictFormContainer";
import { DictTesterContainer } from "./DictTester/DictTesterContainer";
import { Grid } from "../../ui-kit/Grid/Grid";
import GridCell from "../../ui-kit/Grid/GridCell";
import { DictOutputContainer } from "./DictOutput/DictOutputContainer";
import { AppMenuContainer } from "./AppMenu/AppMenuContainer";
import { DictMetaContainer } from "./DictMeta/DictMetaContainer";
import { DictSubmitContainer } from "./DictSubmit/DictSubmitContainer";

export class AppContainer extends BaseContainer<typeof appStoreGroup.state, {}> {
    render() {
        return (
            <div className="App">
                <AppMenuContainer className="App-menu" dictForm={this.props.dictForm} />
                <Grid className="App-main">
                    <GridCell col="6of12" className="App-left">
                        <DictFormContainer dictForm={this.props.dictForm} />
                    </GridCell>
                    <GridCell col="6of12" className="App-right">
                        <DictTesterContainer dictForm={this.props.dictForm} dictTester={this.props.dictTester} />
                    </GridCell>
                </Grid>
                <DictMetaContainer dictMeta={this.props.dictMeta} dictForm={this.props.dictForm} />
                <DictSubmitContainer dictForm={this.props.dictForm} dictSubmit={this.props.dictSubmit} />
                <DictOutputContainer dictOutput={this.props.dictOutput} />
            </div>
        );
    }
}
