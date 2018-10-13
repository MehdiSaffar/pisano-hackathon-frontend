import React, { Component } from "react"
import { inject, observer } from "mobx-react"
import classes from "./StepCard.css"
import { observable } from "mobx"

@inject("store")
@observer
class StepCard extends Component {

    @observable checked = false;

    checkStepCard = () => {
        let checked_local = this.checked;
        this.checked = !checked_local;
    }

    render() {
        const class_arr = [classes.StepCard];
        if(this.checked){
            class_arr.push(classes.StepCardChecked);
        }
        return (
            <div className={class_arr.join(' ')} onClick={this.props.onClick}>
                <div className={classes.StepCardLeft}>
                    {this.props.rank}
                </div>
                <div className={classes.StepCardRight}>
                    <h1 className={classes.StepCardTitle}>{this.props.title}</h1>
                    <p>{this.props.description}</p>
                </div>
                <input
                    onChange={this.checkStepCard}
                    type="checkbox"
                    className={classes.StepCardCheckbox}/>
                <span className={classes.StepCardCheckmark}></span>
            </div>
        )
    }
}
                    // <p>{this.props.description}</p>

export default StepCard
