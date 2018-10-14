import React from 'react'
import classes from "./Step.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Step extends React.Component {
    colorGenerator = () => {
        let randInt = Math.floor(Math.random() * 255) + 1; // returns a random integer from 1 to 100
        return "rgb(0," + randInt +",0)";
    };
    render() {
        return (
            <div className={classes.StepContainer}>
                <p>{this.props.children}</p>
                {this.props.showAdd &&<button className={classes.AddStepButton} onClick={this.props.onAddClick}>
                    <FontAwesomeIcon icon="plus" fixedWidth />
                </button> }
                {this.props.showRemove &&<button className={classes.RemoveStepButton} onClick={this.props.onRemoveClick}>
                    <FontAwesomeIcon icon="minus" fixedWidth />
                </button> }
            </div>
        )
    }
}