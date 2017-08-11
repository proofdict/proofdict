// MIT © 2017 azu
import * as React from "react";
import { Callout, IconButton } from "office-ui-fabric-react";

require("./HelpCalloutButton.css");

export interface HelpCalloutButtonState {
    calloutTarget?: EventTarget;
    isCalloutVisible: boolean;
}

export interface HelpCalloutButtonProps {
    children: React.ReactChild | React.ReactChild[];
}

export class HelpCalloutButton extends React.Component<HelpCalloutButtonProps, HelpCalloutButtonState> {
    state = {
        calloutTarget: undefined,
        isCalloutVisible: false
    };

    private _onCalloutDismiss = () => {
        this.setState({
            isCalloutVisible: false
        });
    };

    private onClickButton = (event: React.MouseEvent<any>) => {
        this.setState({
            calloutTarget: event.currentTarget,
            isCalloutVisible: !this.state.isCalloutVisible
        });
    };

    render() {
        const callout = this.state.isCalloutVisible
            ? <Callout
                  className="HelpCallout"
                  role={"alertdialog"}
                  gapSpace={0}
                  targetElement={this.state.calloutTarget}
                  onDismiss={this._onCalloutDismiss}
              >
                  {this.props.children}
              </Callout>
            : null;
        return (
            <div className="HelpCalloutButton-wrapper">
                {callout}
                <IconButton
                    tabIndex={-1}
                    className="HelpCalloutButton"
                    onClick={this.onClickButton}
                    iconProps={{ iconName: "Info" }}
                    title="Help"
                    ariaLabel="Show help"
                />
            </div>
        );
    }
}
