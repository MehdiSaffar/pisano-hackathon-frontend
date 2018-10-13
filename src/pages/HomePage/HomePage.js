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
    @observable
    searchId = null

    @computed
    get documentStore() {
        return this.props.store.document
    }

    onSearchTextChanged = event => {
        console.log(event)
        this.searchText = event.target.value
    }

    onSearchSubmit = event => {
        event.preventDefault()
        this.props.history.push("/document/" + this.searchId)
    }

    render() {
        const header = (
            <div className={classes.Header}>
                <img
                    src="https://via.placeholder.com/200x150"
                    alt="Some logo"
                />
                <h1>Product Name</h1>
            </div>
        )

        const title = (
            <h2 className={classes.Title}>
                Hangi resmi işini halletmek için buradasın...
            </h2>
        )
        const searchInput = (
            <ReactAutocomplete
                items={this.documentStore.allExistingDocuments}
                shouldItemRender={(item, value) =>
                    item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
                }
                getItemValue={item => item.name}
                renderItem={(item, highlighted) => (
                    <div key={item.id} className={[classes.SearchBarItem]}>
                        {item.name}
                    </div>
                )}
                value={this.searchText}
                onChange={this.onSearchTextChanged}
                onSelect={(_, item) => {
                    this.searchText = item.name
                    this.searchId = item.id
                }}
            />
        )

        const searchButton = (
            <button className={classes.SearchButton}>
                <FontAwesomeIcon icon="search" />
            </button>
        )

        const form = (
            <form className={classes.SearchForm} onSubmit={this.onSearchSubmit}>
                {searchInput}
                {searchButton}
            </form>
        )

        const searchSection = (
            <div className={classes.SearchSection}>
                {title}
                {form}
            </div>
        )
        return (
            <div className={classes.Container}>
                {header}
                {searchSection}
            </div>
        )
    }
}

export default withRouter(HomePage)
