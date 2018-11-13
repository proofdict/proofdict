import * as React from "react";
import GridCell from "./GridCell";

const classNames = require("classnames");
require("./Grid.css");
/**
 Usage

 <Grid>
 <GridCell col="6of12">
 contents
 </GridCell>
 <GridCell col="6nof12">>
 contents
 </GridCell>
 </Grid>
 */
export { GridCell };

export interface GridProps {
    className?: string;
    children: React.ReactChild | React.ReactChild[];
}

export class Grid extends React.Component<GridProps, {}> {
    render() {
        return <div className={classNames("Grid", this.props.className)}>{this.props.children}</div>;
    }
}
