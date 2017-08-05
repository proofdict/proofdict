import * as React from "react";
import "./AppContainer.css";
import { appStoreGroup } from "./AppStoreGroup";

const logo = require("./logo.svg");

export class AppContainer extends React.Component<typeof appStoreGroup.state, {}> {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>便利</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
            </div>
        );
    }
}
