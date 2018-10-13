import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'mobx-react'
// const store = new function() {
//     this.note=  new NoteStore(this)
//     this.auth=  new AuthStore(this)
//     this.settings= new SettingsStore(this)
// }

// store.auth.init()

const app = (
    // <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    // </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
registerServiceWorker()
