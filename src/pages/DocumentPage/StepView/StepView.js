import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { observer, inject } from "mobx-react"
import { observable, computed } from "mobx"
import classes from "./StepView.css"
import StepCard from "../../../components/StepCard/StepCard"

@inject("store")
@observer
class StepView extends Component {
    @computed
    get documentStore() {
        return this.props.store.document
    }

    componentDidMount() {
        this.documentStore.getDocument(this.props.match.params.documentId)
    }

    onStepCardClicked = (id, name) => {
        this.documentStore.getDocument(id)
        this.props.history.push('/document/' + id)
    }

    render() {
        const title = (
            <h1>
                {this.documentStore.currentDocument.name} almak için almanız gereken belgeler
            </h1>
        )
        const cards = (
            <div className={classes.StepCardList}>
                {this.documentStore.documents.map((doc, index) => {
                    return (
                        <StepCard
                            key={doc.id}
                            onClick={() => this.onStepCardClicked(doc.id, doc.name)}
                            title={doc.name}
                            rank={index + 1}
                            description={doc.description}
                        />
                    )
                })}
            </div>
        )

        return (
            <div className={classes.DocumentPage}>
                {title} 
                {cards}
            </div>
        )
    }
}

export default withRouter(StepView)
