import React from 'react'
import classes from "./Step.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Step extends React.Component {
    colors = [
        {
            bg: "#CD5C5C",
            c: "white",
        },
        {
            bg: "#F08080",
            c: "black",
        },
        {
            bg: "#FA8072",
            c: "black",
        },
        {
            bg: "#E9967A",
            c: "black",
        },
        {
            bg: "#FFA07A",
            c: "black",
        },
        {
            bg: "#DC143C",
            c: "white",
        },
        {
            bg: "#B22222",
            c: "white",
        }



    ]
        
    
    colorGenerator() {
        const index = Math.floor(Math.random() * this.colors.length)
        return this.colors[index]
    }
    randomColor = this.colorGenerator()
    render() {
        return (
            <div style={{backgroundColor: this.randomColor.bg, color: this.randomColor.c}}className={classes.StepContainer}>
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