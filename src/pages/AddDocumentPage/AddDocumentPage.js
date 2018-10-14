import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { observer, inject } from "mobx-react"
import { observable, computed, autorun, action } from "mobx"
import assert from 'assert'
// import icons from "../../icons"

import classes from "./AddDocumentPage.css"
import inputClasses from "../../containers/UI/Form/Input/Input.css"
import { TreeView } from "./../../containers/UI/TreeView/TreeView"
import uuidV1 from "uuid/v1"
import ReactAutocomplete from "react-autocomplete"
import Button from "./../../containers/UI/Form/Button/Button"
import Step from "../../components/Step/Step"
import axios from './../../mobx/axios';

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
        filled: false,
        localId: uuidV1(), // used as key for react
        name: null,
        description: "",
        hints: "",
        children: [],
    }

    @observable
    currentStep = {
        name: "",
        filled: false,
        description: "",
        hints: "",
        localId: uuidV1(),
        children: [],
    }

    @observable current = this.steps

    onAddSubStep = parent => {
        this.currentStep = {
            name: "",
            filled: false,
            description: "",
            hints: "",
            localId: uuidV1(),
            children: [],
        }
        
        const newStep = {}
        newStep.name = ""
        newStep.filled = false
        newStep.id = null
        newStep.localId = uuidV1()
        newStep.children = []
        parent.children.push(newStep)

        console.log("Setting parent to " + parent.name)

        this.current = parent.children[parent.children.length - 1]
    }

    onRemoveSubStep = (parent, index) => {
        console.log('onRemoveSubStep');
        
        parent.children.splice(index, 1)
    }

    onAddStepClick = () => {
       console.log('onAddStepClick')
        
        this.current.name = this.currentStep.name
        console.log("Changing current to " + this.current.name);
        this.current.filled = true
        this.current.id = this.currentStep.id || null
        this.current.localId = this.currentStep.localId
        this.current.children = []

        this.currentStep = {
            name: "",
            filled: false,
            description: "",
            hints: "",
            localId: uuidV1(),
            children: [],
        }
    }

    onSubmitForm = async event => {
        event.preventDefault()
        const formatted = this.getData(this.steps)
        console.log(formatted);
        try {
            const response = await axios.post("/api/nodes", formatted)
            console.log("posted successfully", response)
        } catch(err) {
            console.log(err)
            throw err
        }
        
    }

    getTreeView = (parent, step, level, index) => {
        if (step === undefined) return null
        index = index === undefined ? 0 : index
        return (
            <TreeView
                key={step.localId}
                label={
                    <Step
                        showAdd={step.filled}
                        showRemove={level > 0}
                        onAddClick={() => this.onAddSubStep(step)}
                        onRemoveClick={() => this.onRemoveSubStep(parent, index)}
                    >
                        {step.filled ? `${index + 1}. ${step.name}` : 'Please describe this step in the form below'}
                    </Step>
                }
            >
                {step.children.map((el, index) =>
                    this.getTreeView(step, el, level + 1, index)
                )}
            </TreeView>
        )
    }

    getData = step => {
        assert(step !== undefined)
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
        const tree = this.getTreeView(this.steps, this.steps, 0, 0)
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
                        if (highlighted) {
                            cls.push(classes.Highlighted)
                        }
                        return (
                            <div key={item.id} className={cls.join(" ")}>
                                {item.name}
                            </div>
                        )
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

        const hints = (
            <div className={inputClasses.Input}>
                <label className={inputClasses.Label}>Hints: </label>
                <textarea
                    className={inputClasses.InputElement}
                    value={this.currentStep.hints}
                    onChange={event => {
                        this.currentStep.hints = event.target.value
                    }}
                    placeholder="Hints ?"
                />
            </div>
        )

        const submit = (
            <Button
                type="submit"
                btnStyle={"Success"}
                style={{ margin: "10px" }}
                onClick={(e) => this.onSubmitForm(e)}
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
                onSubmit={(e) => e.preventDefault() }
                className={classes.AddDocumentPageForm}
            >
                {title}
                {name}
                {description}
                {hints}
                <div className={classes.FormButtonGroup}>
                    {addStepButton}
                    {submit}
                </div>
            </form>
        )

        return (
            <div className={classes.AddDocumentPage}>
                <h2>Steps: </h2>
                {tree}
                {form}
            </div>
        )
    }
}

export default withRouter(AddDocumentPage)