import React, { Component } from "react"
import { withRouter } from "react-router"
import { observer, inject } from "mobx-react"
import { observable, computed } from "mobx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classes from "./HomePage.css"
import ReactAutocomplete from "react-autocomplete"

const mockItems = [
    { id: "passport", label: "Passport" },
    { id: "student_document", label: "Student document" },
    { id: "birth_certificate", label: "Birth certificate" },
]

@inject("store")
@observer
class HomePage extends Component {
    @observable
    searchText = ""

    @computed get documentStore() { return this.props.store.document}

    onSearchTextChanged = event => {
        console.log(event)
        this.searchText = event.target.value
    }


    onSearchSubmit = event => {
        event.preventDefault()
        console.log("Searching for " + this.searchText)
        this.props.history.push('/document/' + this.searchText)
    }

    render() {
        return (
            <div className={classes.SearchSection}>
                <h1 className={classes.Title}>
                    What document would you like to obtain?
                </h1>
                <form
                    className={classes.SearchForm}
                    onSubmit={this.onSearchSubmit}
                >
                    <ReactAutocomplete
                        items={mockItems}
                        shouldItemRender={(item, value) =>
                            item.label
                                .toLowerCase()
                                .indexOf(value.toLowerCase()) > -1
                        }
                        getItemValue={item => item.label}
                        renderItem={(item, highlighted) => (
                            <div
                                key={item.id}
                            >
                                {item.label}
                            </div>
                        )}
                        value={this.searchText}
                        onChange={this.onSearchTextChanged}
                        onSelect={(itemName) => this.searchText = itemName}
                    />
                    <button className={classes.SearchButton}>
                        <FontAwesomeIcon icon="search" />
                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(HomePage)
