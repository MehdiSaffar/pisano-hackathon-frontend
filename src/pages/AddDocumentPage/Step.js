import React from 'react'
import Button from './../../containers/UI/Form/Button/Button';
import classes from './Step.css'

export default class Step extends React.Component {
    render() {
        return (
            <div style={{ display: "flex" }}>
                <p className={classes.Step}>{this.props.children}</p>
            </div>
        )
    }
}
                // {this.props.showAdd && (
                //     <Button onClick={this.props.onAddClick}>add</Button>
                // )}