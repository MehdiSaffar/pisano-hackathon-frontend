import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { observer, inject } from "mobx-react"
import { observable, computed } from "mobx"
// import icons from "../../icons"
import classes from "./AddDocumentPage.css"
import Input from "./../../containers/UI/Form/Input/Input"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IncomingMessage } from "http";

@inject("store")
@observer
class AddDocumentPage extends Component {
    @computed
    get documentStore() {
        return this.props.store.document
    }

    @observable
    dependencyInputs = [
        {
            value: "",
        },
        {
            value: "",
        },
        {
            value: "",
        },
    ]
    onSubmitForm = event => {
        event.preventDefault()
    }

    render() {
        return (
            <div className={classes.AddDocumentPage}>
                <form onSubmit={this.onSubmitForm}>
                    <Input
                        label="Document name"
                        // icon={icons.document}
                        value={this.documentName}
                        placeholder="Document name"
                    />
                    <div>
                        <p>Dependencies</p>
                        {this.dependencyInputs.map((input, index) => {
                            const label = "Dependency No " + index
                            return (
                                <div className={classes.DependencyInputGroup}>
                                    <Input
                                        key={index}
                                        value={input.name}
                                        placeholder={label}
                                    />
                                    <button className={classes.AddDependencyButton}>
                                        add
                                    </button>
                                
                                </div>
                            )
                        })}
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(AddDocumentPage)
