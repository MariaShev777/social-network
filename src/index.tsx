import React from 'react';
import store from "./redux/redux-store";
import ReactDOM from 'react-dom';
import './index.css';
import App, {RootStateType} from "./App";
import {BrowserRouter} from "react-router-dom";


const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App store={store.getState()}/>
        </BrowserRouter>, document.getElementById('root')
    );
}
rerenderEntireTree(store.getState());


store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});
