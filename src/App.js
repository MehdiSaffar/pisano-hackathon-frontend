import React, { Component, Fragment } from "react"
import logo from "./assets/evrakisim_logo2.png";
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


@inject("store")
@observer
class App extends Component {
    @computed get documentStore() { return this.props.store.document}
    componentDidMount() {
        console.log("app did mount")
        if(this.documentStore.allExistingDocuments.length === 0) {
            this.documentStore.getAllExistingDocuments()
        }
    }

    render() {
        const routes = (
            <Switch>
                <Route path="/document/:documentId" exact component={DocumentPage}/>
                <Route path="/add" exact component={AddDocumentPage}/>
                <Route path="/" exact component={HomePage}/>
            </Switch>
        )
        return (
            <div className={classes.App}>
                <div className={classes.Header}>
                    <a href="/">
                        <img src={logo} alt="Evrakişim"/>
                    </a>
                </div>
                {routes}
                <div className={classes.Footer}>

                </div>
            </div>
        )
    }
}

export default withRouter(App)
