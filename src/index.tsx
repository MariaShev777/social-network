import React from 'react';
import store from "./redux/redux-store";
import ReactDOM from 'react-dom';
import './index.css';
import App, {RootStateType} from "./App";
import {BrowserRouter} from "react-router-dom";


const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={store.getState()} dispatch={store.dispatch.bind(store)}/>
        </BrowserRouter>, document.getElementById('root')
    );
}
rerenderEntireTree(store.getState());

// @ts-ignore
store.subscribe(rerenderEntireTree);
