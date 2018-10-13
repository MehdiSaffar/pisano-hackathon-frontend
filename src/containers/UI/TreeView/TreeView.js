import React, { Component, Fragment } from "react"
import classes from "./TreeView.css"

export class TreeView extends Component {
    render() {
        return (
            <Fragment>
                <div className={classes.TreeItem}>{this.props.label}</div>
                <div className={classes.TreeChildren}>{this.props.children}</div>
            </Fragment>
        )
    }
}

export default TreeView
