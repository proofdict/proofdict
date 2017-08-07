import * as React from "react";
import "./AppContainer.css";
import { appStoreGroup } from "./AppStoreGroup";
import { BaseContainer } from "../BaseContainer";
import { DictFormContainer } from "./DictForm/DictFormContainer";
import { DictTesterContainer } from "./DictTester/DictTesterContainer";
import { Grid } from "../../ui-kit/Grid/Grid";
import GridCell from "../../ui-kit/Grid/GridCell";

export class AppContainer extends BaseContainer<typeof appStoreGroup.state, {}> {
    render() {
        return (
            <div className="App">
                <Grid className="App-grid">
                    <GridCell col="6of12" className="App-left">
                        <DictFormContainer dictForm={this.props.dictForm}/>
                    </GridCell>
                    <GridCell col="6of12" className="App-right">
                        <DictTesterContainer dictForm={this.props.dictForm} dictTester={this.props.dictTester}/>
                    </GridCell>
                </Grid>
            </div>
        );
    }
}
