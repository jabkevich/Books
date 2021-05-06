import React, {Component, Fragment} from 'react'
import {HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SearchPage from "./SearchPage/SearchPage";

class App extends Component {

    render() {
        return (
            <Fragment>
                <SearchPage/>
            </Fragment>
        )
    }
}



export default App