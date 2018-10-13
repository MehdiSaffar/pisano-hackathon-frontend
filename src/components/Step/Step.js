import React from 'react'
import classes from "./Step.css"

export default class Step extends React.Component {
    render() {
        return (
            <div className={classes.StepContainer}>
                <p>{this.props.children}</p>
                {this.props.showAdd && (
                    <button onClick={this.props.onAddClick}>+</button>
                )}
            </div>
        )
    }
}