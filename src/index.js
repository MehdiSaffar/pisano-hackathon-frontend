import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import { library } from "@fortawesome/fontawesome-svg-core"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "mobx-react"
import { icons } from "./icons"
import store from "./mobx/store"

const ic = Object.keys(icons).map(iconName => icons[iconName])
library.add(...ic)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
registerServiceWorker()
