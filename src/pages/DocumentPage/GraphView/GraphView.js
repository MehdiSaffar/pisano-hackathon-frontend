import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { observer, inject } from "mobx-react"
import { observable, computed, runInAction } from "mobx"
import classes from "./GraphView.css"
import { Graph } from "react-d3-graph"

@inject("store")
@observer
class GraphView extends Component {
    @computed
    get documentStore() {
        return this.props.store.document
    }

    componentDidMount() {
        this.documentStore.getDocument(this.props.match.params.documentId)
    }

    getScreenSize= () => {
        return {
            height: window.innerHeight - 144,
            width: window.innerWidth - 8
        }
    }
    render() {
        // graph payload (with minimalist structure)
        const data = {
            nodes: [],
            links: [],
        }

        // the graph configuration, you only need to pass down properties
        // that you want to override, otherwise default ones will be used
        // const myConfig = {
        //     nodeHighlightBehavior: true,
        //     node: {
        //         color: "lightgreen",
        //         size: 120,
        //         highlightStrokeColor: "blue",
        //         labelProperty: "label",
        //     },
        //     link: {
        //         highlightColor: "lightblue",
        //     },
        //     minZoom: "4",
        //     maxZoom: "4",
        //     height: "400px",
        //     width: "400px",
        // }
        const otherconfig = {
            ...this.getScreenSize(),
            automaticRearrangeAfterDropNode: false,
            collapsible: false,
            highlightDegree: 1,
            highlightOpacity: 1,
            linkHighlightBehavior: false,
            maxZoom: 8,
            minZoom: 0.1,
            nodeHighlightBehavior: false,
            panAndZoom: false,
            staticGraph: false,
            d3: {
                alphaTarget: 0.05,
                gravity: -100,
                linkLength: 100,
                linkStrength: 1,
            },
            node: {
                color: "#d3d3d3",
                fontColor: "black",
                fontSize: 8,
                fontWeight: "normal",
                highlightColor: "SAME",
                highlightFontSize: 8,
                highlightFontWeight: "normal",
                highlightStrokeColor: "SAME",
                highlightStrokeWidth: 1.5,
                labelProperty: "id",
                mouseCursor: "pointer",
                opacity: 1,
                renderLabel: true,
                size: 200,
                strokeColor: "none",
                strokeWidth: 1.5,
                svg: "",
                symbolType: "circle",
            },
            link: {
                color: "#d3d3d3",
                highlightColor: "#d3d3d3",
                opacity: 1,
                semanticStrokeWidth: false,
                strokeWidth: 1.5,
            },
        }

        for (const doc of this.documentStore.documents) {
            console.log(doc)
            const newNode = {
                id: doc.id ? doc.id : doc._id,
                label: doc.name,
            }
            if (
                doc.id ===
                this.documentStore.documents[
                    this.documentStore.documents.length - 1
                ].id
            ) {
                newNode.symbolType = "square"
                newNode.color = "red"
                newNode.size = 300
            } else {
                newNode.symbolType = "circle"
            }
            data.nodes.push(newNode)

            if (doc.dependencies)
                for (const depId of doc.dependencies) {
                    data.links.push({
                        source: doc.id ? doc.id : doc._id,
                        target: depId,
                    })
                }
        }

        console.log(data)
        // setTimeout(() => document.getElementById('graph-id-graph-wrapper').classList.add('fucker'), 1000)
        return (
            <div className={classes.GraphView}>
                {this.documentStore.documents.length > 0 && (
                    <Graph
                        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                        data={data}
                        config={otherconfig}
                    />
                )}
            </div>
        )
    }
}

export default withRouter(GraphView)
