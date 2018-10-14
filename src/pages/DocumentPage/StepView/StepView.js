import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { observer, inject } from "mobx-react"
import { observable, computed } from "mobx"
import classes from "./StepView.css"
import StepCard from "../../../components/StepCard/StepCard"
import assert from "assert"

@inject("store")
@observer
class StepView extends Component {
    @computed
    get documentStore() {
        return this.props.store.document
    }

    componentDidMount() {
        assert(this.props.match.params.documentId !== undefined)
        this.documentStore.getDocument(this.props.match.params.documentId)
    }

    onStepCardClicked = id => {
        assert(id !== undefined)
        this.props.history.push("/document/" + id)
    }

    render() {
        const title = (
            <h1>
                <span className={classes.RequiredDocument}>
                    {this.documentStore.currentDocument.name} 
                </span>
                {" almak için almanız gereken belgeler"}
            </h1>
        )
        const cards = (
            <div className={classes.StepCardList}>
                {this.documentStore.documents.map((doc, index) => {
                    console.log(JSON.parse(JSON.stringify(doc)))

                    return (
                        <StepCard
                            key={doc.id}
                            onClick={() => this.onStepCardClicked(doc.id)}
                            title={doc.name}
                            rank={index + 1}
                            description={doc.description}
                        />
                    )
                })}
            </div>
        )

        return (
            <div className={classes.StepView}>
                {title}
                {cards}
            </div>
        )
    }
}

export default withRouter(StepView)
