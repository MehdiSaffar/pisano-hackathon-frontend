import React, { Component } from "react"
import { inject, observer } from "mobx-react"
import classes from "./StepCard.css"

@inject("store")
@observer
class StepCard extends Component {
    render() {
        return (
            <div className={classes.StepCard} onClick={this.props.onClick}>
                <div className={classes.StepCardLeft}>
                    {this.props.rank}
                </div>
                <div className={classes.StepCardRight}>
                    <h1 className={classes.StepCardTitle}>{this.props.title}</h1>
                    <p>Lorem ipsum dolo Phasellus varius porta ipsum. Donec molestie eu augue a molestie. Nam in sem vulputate, volutpat magna sed, egestas velit. Fusce quis eros velit. Integer tempor, urna vitae egestas laoreet, est mauris mollis ante, quis aliquet libero dui quis velit. </p>
                </div>
                <input type="checkbox" className={classes.StepCardCheckbox}/>
            </div>
        )
    }
}
                    // <p>{this.props.description}</p>

export default StepCard
