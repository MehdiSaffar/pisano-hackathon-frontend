import React from 'react'
import classes from "./Step.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Step extends React.Component {
    render() {
        return (
            <div className={classes.StepContainer}>
                <p>{this.props.children}</p>
                {this.props.showAdd &&<button className={classes.AddStepButton} onClick={this.props.onAddClick}>
                    <FontAwesomeIcon icon="plus" fixedWidth />
                </button> }
            </div>
        )
    }
}