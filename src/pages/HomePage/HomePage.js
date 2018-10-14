import React, { Component } from "react"
import { withRouter } from "react-router"
import { observer, inject } from "mobx-react"
import { observable, computed } from "mobx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classes from "./HomePage.css"
import ReactAutocomplete from "react-autocomplete"
import logo from "../../assets/evrakisim_logo.png";

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
        if(event) event.preventDefault()
        this.props.history.push("/document/" + this.searchId)
    }

    render() {
        const header = (
            <div className={classes.Header}>
                <img
                    src={logo}
                    alt="Some logo"
                />
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
                shouldItemRender = {(item, value) => {
                        if(item.name){
                            return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
                        }
                    }
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
                    this.onSearchSubmit()
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
