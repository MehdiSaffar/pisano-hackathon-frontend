import React, { Component } from "react"
import { observable } from "mobx"
import StepView from "./StepView/StepView"
import GraphView from "./GraphView/GraphView"
import { inject, observer} from 'mobx-react';
import Button from './../../containers/UI/Form/Button/Button';
import classes from './DocumentPage.css'

@inject('store')
@observer
export class DocumentPage extends Component {
    @observable
    view = "list"
    onToggleViewButtonClicked = () => {
        this.view = this.view === "graph" ? "list" : "graph"
    }

    render() {
        return (
            <div className={classes.DocumentPage}>
                <Button onClick={this.onToggleViewButtonClicked}>
                    Görünümü Değiştir
                </Button>
                {this.view === "graph" ? <GraphView /> : <StepView />}
            </div>
        )
    }
}

export default DocumentPage
