import React, { Component, Fragment } from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { icons } from "./icons"
import { withRouter } from "react-router"
import { inject } from "mobx-react";

// const ic = Object.keys(icons).map(iconName => icons[iconName])
// library.add(...ic)

@inject('store')
class App extends Component {
    render() {
        return (
            <p>Hello World!</p>
        )
    }
}

export default withRouter(App)
