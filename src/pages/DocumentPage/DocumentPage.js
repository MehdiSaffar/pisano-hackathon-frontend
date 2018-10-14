import React, { Component } from "react"
import { observable } from "mobx"
import StepView from "./StepView/StepView"
import GraphView from "./GraphView/GraphView"
import { inject, observer} from 'mobx-react';
import Button from './../../containers/UI/Form/Button/Button';

@inject('store')
@observer
export class DocumentPage extends Component {
    @observable
    view = "graph"
    onToggleViewButtonClicked = () => {
        this.view = this.view === "graph" ? "list" : "graph"
    }

    render() {
        return (
            <div style={{textAlign: 'center', margin: "12px"}}>
                <Button onClick={this.onToggleViewButtonClicked}>
                    Görünümü Değiştir
                </Button>
                {this.view === "graph" ? <GraphView /> : <StepView />}
            </div>
        )
    }
}

export default DocumentPage
