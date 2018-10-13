import React, { Component, Fragment } from "react"
// import { library } from "@fortawesome/fontawesome-svg-core"
// import { icons } from "./icons"
import { withRouter } from "react-router"
import { computed } from "mobx"
import { inject, observer } from "mobx-react"
import HomePage from "./pages/HomePage"
import classes from './App.css'

// const ic = Object.keys(icons).map(iconName => icons[iconName])
// library.add(...ic)

@inject("store")
@observer
class App extends Component {
    render() {
        return (
            <div className={classes.App}>
                <HomePage />
            </div>
        )
    }
}

export default withRouter(App)
