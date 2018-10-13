import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { observer, inject } from "mobx-react"
import { observable, computed } from "mobx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classes from "./DocumentPage.css"
import StepCard from "./../../components/StepCard/StepCard"

@inject("store")
@observer
class DocumentPage extends Component {
    @computed
    get documentStore() {
        return this.props.store.document
    }
    onStepCardClicked = (id, name) => {
        this.documentStore.getDocument(id)
        this.props.history.push('/document/' + name)
    }

    componentDidMount() {
        this.documentStore.getDocument(this.props.match.params.documentName)
    }
    render() {
        const title = (
            <h1>
                Here are the steps for obtaining a {this.documentStore.currentDocument.name}
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
                            description="some description"
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

export default withRouter(DocumentPage)
