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
        filled: false,
        localId: uuidV1(), // used as key for react
        name: null,
        children: [],
    }

    @observable
    currentStep = {
        name: "",
        filled: false,
        description: "",
        localId: uuidV1(),
        children: [],
    }

    @observable current = this.steps

    onAddSubStep = parent => {
        this.currentStep = {
            name: "",
            filled: false,
            description: "",
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
        console.log('onAddStepClick')
        
        this.current.name = this.currentStep.name
        console.log("Changing current to " + this.current.name);
        this.current.filled = true
        this.current.id = this.currentStep.id || null
        this.current.localId = this.currentStep.localId
        this.current.children = []
        // if (this.current) {
        //     this.parent.children.push(newStep)
        // } else {
        //     this.steps.name = this.currentStep.name
        //     this.steps.filled = true
        //     this.steps.id = this.currentStep.id || null
        //     this.steps.localId = this.currentStep.localId
        // }

        this.currentStep = {
            name: "",
            filled: false,
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
                        showAdd={step.filled}
                        onAddClick={() => this.onAddSubStep(step)}
                    >
                        {step.filled ? `${index + 1}. ${step.name}` : <span>Lütfen, bu adımı yukarıdaki formdan doldur</span>}
                    </Step>
                }
            >
                {step.children.map((el, index) =>
                    this.getTreeView(el, level + 1, index)
                )}
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
                    menuStyle={{background:"rgba(255, 255, 255, 1)", zIndex:10, position: "absolute", left: 0, top: 40}}
                    wrapperStyle={{position: "relative"}}
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
                            placeholder="Döküman veya adım ismi"
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
                <textarea
                    className={inputClasses.InputElement}
                    value={this.currentStep.description}
                    onChange={event => {
                        this.currentStep.description = event.target.value
                    }}
                    placeholder="Dökümanla veya adımla ilgili açıklama"
                />
            </div>
        )
        const submit = (
            <button
                type="submit"
                btnStyle={"Success"}
                className={classes.SubmitButton}
            >
                Kaydet
            </button>
        )

        const addStepButton = (
            <button onClick={this.onAddStepClick}>
                +
            </button>
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
                </div>
            </form>
        )

        return (
            <div className={classes.PageContainer}>
                <h1>Süreci Tasarla</h1>

                <div className={classes.AddDocumentPage}>
                    {form}
                </div>

                <div className={classes.FormContainer}>
                    <h2>Adımlar: </h2>
                    {tree}
                </div>

                {submit}
            </div>
        )
    }
}

export default withRouter(AddDocumentPage)