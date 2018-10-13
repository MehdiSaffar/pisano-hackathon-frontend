import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { observer, inject } from "mobx-react"
import { observable, computed, autorun, action } from "mobx"
// import icons from "../../icons"

import classes from "./AddDocumentPage.css"
import inputClasses from '../../containers/UI/Form/Input/Input.css'
import { TreeView } from "./../../containers/UI/TreeView/TreeView"
import uuidV1 from "uuid/v1"
import ReactAutocomplete from "react-autocomplete"

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

    // check = autorun(() => console.log('autorun', JSON.stringify(this.steps)))

    @observable
    steps = {
        id: null,
        localId: uuidV1(),
        name: "Passport",
        toggled: true,
        children: [],
    }

    onAddStepClick = () => {
        console.log("onAddStepClick")

        const neww = {
            id: null,
            localId: uuidV1(),
            name: "unnamed",
            children: [],
        }

        // this.currentStep = neww
        this.steps.children.push(neww)
        this.currentStep = this.steps.children[this.steps.children.length - 1]
        this.currentStep.name = "no name"
        this.currentStep.description = "no name"
        console.log("onAddStepClick", this.currentStep)
    }

    onSubmitForm = event => {
        event.preventDefault()
        const data = this.getData(this.steps)
        console.log(data)
    }

    getTreeView = (step, level) => {
        if (step === undefined) return null
        return (
            <TreeView
                label={
                    <Step
                        showAdd={level === 0}
                        onAddClick={() => this.onAddStepClick()}
                    >
                        {step.name}
                    </Step>
                }
                key={step.localId}
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
        if (data.description) data.description = step.description
        data.dependencies = step.children.map(el => this.getData(el)) || []

        return data
    }

    onAddStepFromForm = () => {
        this.currentStep.name = this.stepName
        this.currentStep.description = this.stepDescription
    }

    @observable
    currentStep = this.steps

    render() {
        const tree = this.getTreeView(this.steps, 0)
        const mockItems = [
            { id: "passport", name: "Passport" },
            { id: "student_document", name: "Student document" },
            { id: "birth_certificate", name: "Birth certificate" },
        ]

        return (
            <div className={classes.AddDocumentPage}>
                {tree}
                <form onSubmit={this.onSubmitForm}>
                    <ReactAutocomplete
                        // items={this.documentStore.allExistingDocuments}
                        items={mockItems}
                        shouldItemRender={(item, value) => {
                            const ret =
                                item.name
                                    .toLowerCase()
                                    .indexOf(value.toLowerCase()) > -1
                            console.log(ret)

                            return ret
                        }}
                        getItemValue={item => item.id}
                        renderItem={(item) => {
                            console.log("renderItem", item)
                            return (
                                <div
                                    key={item.id}
                                    // className={[classes.SearchBarItem]}
                                >
                                    {item.name}
                                </div>
                            )
                        }}
                        // inputProps={{ className: classes.SearchBar }}
                        renderInput={props => (
                            <input {...props} className={inputClasses.InputElement}/>
                        )}
                        inputProps={{type: "text"}}
                        value={this.currentStep.name}
                        onChange={event => {
                            this.currentStep.name = event.target.value
                        }}
                        onSelect={itemValue => {
                            this.currentStep.id = itemValue
                        }}
                    />
                    <button onClick={() => this.onAddStepFromForm()}>
                        Add step
                    </button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

// <Input
//     label="Description"
//     value={this.currentStep.description}
//     onChange={event => {
//         this.currentStep.description = event.target.value
//     }}
//     placeholder="Description"
// />
export default withRouter(AddDocumentPage)

class Step extends React.Component {
    render() {
        return (
            <div style={{ display: "flex" }}>
                <p style={{ margin: 0 }}>{this.props.children}</p>
                {this.props.showAdd && (
                    <button
                        onClick={this.props.onAddClick}
                        style={{ marginLeft: "auto" }}
                    >
                        add
                    </button>
                )}
            </div>
        )
    }
}

// <Input
//     label="Document name"
//     // icon={icons.document}
//     value={this.documentName}
//     placeholder="Document name"
// />
// <div>
//     <p>Dependencies</p>
//     {this.dependencyInputs.map((input, index) => {
//         const label = "Dependency No " + index
//         return (
//             <div className={classes.DependencyInputGroup}>
//                 <Input
//                     key={index}
//                     value={input.name}
//                     placeholder={label}
//                 />
//                 <button className={classes.AddDependencyButton}>
//                     add
//                 </button>

//             </div>
//         )
//     })}
// </div>
