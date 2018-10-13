import React, { Component } from "react"
import { withRouter } from "react-router"
import { observer, inject } from "mobx-react"
import { observable } from "mobx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classes from "./HomePage.css"
@inject("store")
@observer
class HomePage extends Component {
    @observable
    searchText = ""

    onSearchTextChanged = event => {
        this.searchText = event.target.value
    }

    onSearchSubmit = event => {
      event.preventDefault()
      console.log("Searching for " + this.searchText)
    }


    render() {
        return (
            <div className={classes.SearchSection}>
                <h1 className={classes.Title}>
                    What document would you like to obtain?
                </h1>
                <form className={classes.SearchForm} onSubmit={this.onSearchSubmit}>
                  <input
                      className={classes.SearchBar}
                      value={this.searchText}
                      onChange={this.onSearchTextChanged}
                      placeholder="Document name"
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
