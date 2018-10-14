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
import Step from "../../components/Step/Step"

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
        name: "",
        description: "",
        localId: uuidV1(),
        children: [],
    }

    onAddSubStep = (parent) => {
        this.currentStep = {
            name: "",
            description: "",
            localId: uuidV1(),
            children: [],
        }
        console.log("Setting parent to ")
        console.log(parent.name);
        
        this.parent = parent;
    }
    onAddStepClick = () => {
        // if (this.steps.name === null) {
        //     this.steps.name = this.currentStep.name
        //     this.steps.id = this.currentStep.id || null
        //     this.steps.localId = this.currentStep.localId
        // } else {
        //     const newStep = {}
        //     newStep.name = this.currentStep.name
        //     newStep.id = this.currentStep.id || null
        //     newStep.localId = this.currentStep.localId
        //     newStep.children = []
        //     this.steps.children.push(newStep)
        // }
        const newStep = {}
        newStep.name = this.currentStep.name
        newStep.id = this.currentStep.id || null
        newStep.localId = this.currentStep.localId
        newStep.children = []
        if(this.parent) {
            this.parent.children.push(newStep)
        } else {
            this.steps.name = this.currentStep.name
            this.steps.id = this.currentStep.id || null
            this.steps.localId = this.currentStep.localId
        }

        this.currentStep = {
            name: "",
            description: "",
            localId: uuidV1(),
            children: [],
        }
    }

    onSubmitForm = event => {
        event.preventDefault()
        this.getData(this.steps)
    }

    getTreeView = (step, level, index) => {
        if (step === undefined) return null
        index = index === undefined ? 0 : index
        return (
            <TreeView
                key={step.localId}
                label={
                    <Step
                        showAdd={level === 0}
                        onAddClick={() => this.onAddSubStep(step)}
                    >
                        {`${index + 1}. ${step.name}`}
                    </Step>
                }
            >
                {step.children.map((el, index) => this.getTreeView(el, level + 1, index))}
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
            <div className={inputClasses.Input}>
                <label className={inputClasses.Label}>Name: </label>
                <ReactAutocomplete
                    items={this.documentStore.allExistingDocuments}
                    shouldItemRender={(item, value) => {
                        if (item.name)
                            return (
                                item.name
                                    .toLowerCase()
                                    .indexOf(value.toLowerCase()) > -1
                            )
                    }}
                    getItemValue={item => item.name}
                    renderItem={(item, highlighted) => {
                        const cls = [classes.SearchItem]
                        if(highlighted) {
                            cls.push(classes.Highlighted)
                        }
                        return <div key={item.id} className={cls.join(' ')}>{item.name}</div>
                    }}
                    renderInput={props => (
                        <input
                            {...props}
                            placeholder="Document name"
                            className={inputClasses.InputElement}
                            // style={{ margin: "10px" }}
                        />
                    )}
                    value={this.currentStep.name}
                    onChange={event => {
                        this.currentStep.name = event.target.value
                    }}
                    onSelect={(_, item) => {
                        this.currentStep.id = item.id
                        this.currentStep.name = item.name
                    }}
                />
            </div>
        )
        const description = (
            <div className={inputClasses.Input}>
                <label className={inputClasses.Label}>Description: </label>
                <textarea
                    className={inputClasses.InputElement}
                    value={this.currentStep.description}
                    onChange={event => {
                        this.currentStep.description = event.target.value
                    }}
                    placeholder="Document description"
                />
            </div>
        )
        const submit = (
            <Button
                type="submit"
                btnStyle={"Success"}
                style={{ margin: "10px" }}
            >
                Submit
            </Button>
        )

        const addStepButton = (
            <Button onClick={this.onAddStepClick} style={{ margin: "10px" }}>
                Add Step
            </Button>
        )
        const form = (
            <form
                onSubmit={this.onSubmitForm}
                className={classes.AddDocumentPageForm}
            >
                {title}
                {name}
                {description}
                <div className={classes.FormButtonGroup}>
                    {addStepButton}
                    {submit}
                </div>
            </form>
        )

        return (
            <div className={classes.AddDocumentPage}>
                <h2>Steps: </h2>
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
