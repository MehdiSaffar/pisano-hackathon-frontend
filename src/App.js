import React, { Component, Fragment } from "react"
// import { library } from "@fortawesome/fontawesome-svg-core"
// import { icons } from "./icons"
import { withRouter } from "react-router"
import { computed } from "mobx"
import { inject, observer } from "mobx-react"
import HomePage from "./pages/HomePage/HomePage"
import classes from './App.css'
import { Switch, Route, Redirect } from "react-router"
import DocumentPage from "./pages/DocumentPage/DocumentPage";
import AddDocumentPage from "./pages/AddDocumentPage/AddDocumentPage";

// const ic = Object.keys(icons).map(iconName => icons[iconName])
// library.add(...ic)

@inject("store")
@observer
class App extends Component {

    render() {
        const routes = (
            <Switch>
                <Route path="/document/:documentName" exact component={DocumentPage}/>
                <Route path="/add" exact component={AddDocumentPage}/>
                <Route path="/" exact component={HomePage}/>
            </Switch>
        )
        return (

            <div className={classes.App}>
                {routes}
            </div>
        )
    }
}

export default withRouter(App)
