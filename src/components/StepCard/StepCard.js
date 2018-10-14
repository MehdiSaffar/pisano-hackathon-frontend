import React, { Component } from "react"
import { inject, observer } from "mobx-react"
import classes from "./StepCard.css"
import { observable } from "mobx"

@inject("store")
@observer
class StepCard extends Component {
    @observable
    checked = false

    checkStepCard = () => {
        let checked_local = this.checked
        this.checked = !checked_local
    }

    render() {
        const class_arr = [classes.StepCard]
        if (this.checked) {
            class_arr.push(classes.StepCardChecked)
        }
        return (
            <div className={class_arr.join(" ")}>
                <div
                    className={classes.StepCardLeft}
                    onClick={e => {
                        e.stopPropagation()
                        this.props.onClick(e)
                    }}
                >
                    {this.props.rank}
                </div>
                <div
                    onClick={e => {
                        e.stopPropagation()
                        this.props.onClick(e)
                    }}
                    className={classes.StepCardRight}
                >
                    <h1 className={classes.StepCardTitle}>
                        {this.props.title}
                    </h1>
                    <p>{this.props.description}</p>
                </div>
                <input
                    onChange={this.checkStepCard}
                    type="checkbox"
                    className={classes.StepCardCheckbox}
                />
                <span className={classes.StepCardCheckmark} />
            </div>
        )
    }
}
export default StepCard
