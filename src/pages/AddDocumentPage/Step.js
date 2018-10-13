import React from 'react'
import Button from './../../containers/UI/Form/Button/Button';

export default class Step extends React.Component {
    render() {
        return (
            <div style={{ display: "flex" }}>
                <p style={{ margin: 0 }}>{this.props.children}</p>
                {this.props.showAdd && (
                    <Button onClick={this.props.onAddClick}>add</Button>
                )}
            </div>
        )
    }
}