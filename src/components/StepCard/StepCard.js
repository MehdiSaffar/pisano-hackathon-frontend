import React, { Component, Fragment } from "react"
import { inject, observer } from "mobx-react"
import classes from "./StepCard.css"
import { observable } from "mobx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

@inject("store")
@observer
class StepCard extends Component {
    @observable
    checked = false
    @observable
    showDescription = false
    @observable
    showHints = false
    @observable
    showInstitution = false

    toggleDescription = () => {
        this.showDescription = !this.showDescription
        if (this.showDescription) {
            console.log(this.props.description)
        }
    }
    toggleHints = () => {
        this.showHints = !this.showHints
        if (this.showHints) {
            console.log(this.props.hints)
        }
    }
    toggleInstitution = () => {
        this.showInstitution = !this.showInstitution
        if (this.showInstitution) {
            console.log(this.props.institution)
        }
    }

    checkStepCard = () => {
        let checked_local = this.checked
        this.checked = !checked_local

        if(this.checked) {
            this.props.onCheck(1)
        } else {
            this.props.onCheck(-1)
        }

    }

    render() {
        const class_arr = [classes.StepCard]
        if (this.checked) {
            class_arr.push(classes.StepCardChecked)
        }

        const title = (
            <h1 onClick={(e) => this.props.onClick(e)} className={classes.StepCardTitle}>{this.props.title}</h1>
        )
        const description = <p>{this.props.description}</p>
        const hints = <p>{this.props.hints}</p>
        const institution = (
            <p>
                {this.props.institution.name +
                    "\n" +
                    this.props.institution.description}
            </p>
        )

        const checkbox = (
            <Fragment>
                <input
                    onChange={this.checkStepCard}
                    type="checkbox"
                    className={classes.StepCardCheckbox}
                />
            </Fragment>
        )
        return (
            <div className={class_arr.join(" ")}>
                <div
                    className={classes.StepCardLeft}
                >
                    {this.props.rank}
                </div>
                <div
                    className={classes.StepCardRight}
                >
                    {title}

                    {this.props.description && (
                        <Fragment>
                            
                            <button
                                className={classes.Drop}
                                onClick={this.toggleDescription}
                            >
                                {this.showDescription ? (
                                    <i><FontAwesomeIcon icon="caret-up" /> Description </i>
                                ) : (
                                    <i><FontAwesomeIcon icon="caret-down" /> Description </i>
                                )}
                            </button>
                            {this.showDescription && description}
                        </Fragment>
                    )}

                    {this.props.hints.length > 0 && (
                        <Fragment>
                            
                            <button
                                className={classes.Drop}
                                onClick={this.toggleHints}
                            >
                                {this.showHints ? (
                                    <i><FontAwesomeIcon icon="caret-up" /> Hints </i>
                                ) : (
                                    <i><FontAwesomeIcon icon="caret-down" /> Hints </i>
                                )}
                            </button>
                            {this.showHints && hints}
                        </Fragment>
                    )}

                    {(this.props.institution.name ||
                        this.props.institution.description) && 
                        <Fragment>
                            <button
                                className={classes.Drop}
                                onClick={this.toggleInstitution}
                            >
                                {this.showInstitution ? (
                                    <i><FontAwesomeIcon icon="caret-up" /> Institution </i>
                                ) : (
                                    <i><FontAwesomeIcon icon="caret-down" /> Institution </i>
                                )}
                            </button>
                            {this.showInstitution && institution}
                        </Fragment>
                    }
                </div>
                {checkbox}
            </div>
        )
    }
}
export default StepCard
