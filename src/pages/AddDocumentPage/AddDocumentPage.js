import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { observer, inject } from "mobx-react"
import { observable, computed, autorun, action } from "mobx"
// import icons from "../../icons"

import classes from "./AddDocumentPage.css"
import inputClasses from "../../containers/UI/Form/Input/Input.css"
import { TreeView } from "./../../containers/UI/TreeView/TreeView"
import uuidV1 from "uuid/v1"
import ReactAutocomplete from "react-autocomplete"
import Button from "./../../containers/UI/Form/Button/Button"
import Step from "./Step"

// class Node {

//     constructor({id, localId, name, children})  {
//         this.id = id
//         this.localId = localId
//         this.name = name
//         this.children = children.map(el => new Node(el))
//     }
//     @observable id= null
//     @observable localId= null
//     @observable name= "no name"
//     @observable children= asFlat([])
// }
@inject("store")
@observer
class AddDocumentPage extends Component {
    @computed
    get documentStore() {
        return this.props.store.document
    }

    @observable
    steps = {
        id: null, // real id on database
        localId: uuidV1(), // used as key for react
        name: null,
        children: [],
    }

    @observable
    currentStep = {
        name: "no name",
        description: "no description",
        localId: uuidV1(),
        children: [],
    }

    onAddStepClick = () => {
        if (this.steps.name === null) {
            this.steps.name = this.currentStep.name
            this.steps.id = this.currentStep.id || null
            this.steps.localId = this.currentStep.localId
        } else {
            const newStep = {}
            newStep.name = this.currentStep.name
            newStep.id = this.currentStep.id || null
            newStep.localId = this.currentStep.localId
            newStep.children = []
            this.steps.children.push(newStep)
        }
        this.currentStep = {
            name: "no name",
            description: "no description",
            localId: uuidV1(),
            children: [],
        }
    }

    onSubmitForm = event => {
        event.preventDefault()
        this.getData(this.steps)
    }

    getTreeView = (step, level) => {
        if (step === undefined) return null
        return (
            <TreeView
                key={step.localId}
                label={
                    <Step
                        showAdd={level === 0}
                        onAddClick={() => this.onAddStepClick()}
                    >
                        {step.name}
                    </Step>
                }
            >
                {step.children.map(el => this.getTreeView(el, level + 1))}
            </TreeView>
        )
    }

    getData = step => {
        let data = {}

        // in case known
        if (step.id) {
            data.id = step.id
            return data
        }

        data.name = step.name
        data.description = step.description || ""
        data.dependencies = step.children.map(el => this.getData(el)) || []
        return data
    }

    render() {
        const tree = this.getTreeView(this.steps, 0)
        const title = <h3>Yeni Adım Ekle</h3>
        const name = (
            <ReactAutocomplete
                items={this.documentStore.allExistingDocuments}
                shouldItemRender={(item, value) => {
                    if(item.name) return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
                }
                }
                getItemValue={item => item.name}
                renderItem={item => {
                    return <div key={item.id}>{item.name}</div>
                }}
                renderInput={props => (
                    <input
                        {...props}
                        placeholder="Document name"
                        className={inputClasses.InputElement}
                    />
                )}
                value={this.currentStep.name}
                onChange={event => {
                    this.currentStep.name = event.target.value
                }}
                onSelect={(_, item) => {
                    console.log("onselect", item)
                    this.currentStep.id = item.id
                    this.currentStep.name = item.name
                }}
            />
        )
        const description = (
            <textarea
                className={inputClasses.InputElement}
                value={this.currentStep.description}
                onChange={event => {
                    this.currentStep.description = event.target.value
                }}
                placeholder="Document description"
            />
        )
        const submit = <Button type="submit">Submit</Button>
        const addStepButton = (
            <Button onClick={this.onAddStepClick}>Add Step</Button>
        )
        const form = (
            <form
                onSubmit={this.onSubmitForm}
                className={classes.AddDocumentPageForm}
            >
                {title}
                {name}
                {description}
                {addStepButton}
                {submit}
            </form>
        )

        return (
            <div className={classes.AddDocumentPage}>
                {this.steps.name === null ? (
                    <p>Please enter a new step!</p>
                ) : (
                    tree
                )}
                {form}
            </div>
        )
    }
}

export default withRouter(AddDocumentPage)
