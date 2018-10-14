import React, { Component } from "react"
import { observable } from "mobx"
import StepView from "./StepView/StepView"
import GraphView from "./GraphView/GraphView"
import { inject, observer} from 'mobx-react';

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
            <div>
                <button onClick={this.onToggleViewButtonClicked}>
                    Toggle View
                </button>
                {this.view === "graph" ? <GraphView /> : <StepView />}
            </div>
        )
    }
}

export default DocumentPage
