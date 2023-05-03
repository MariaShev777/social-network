import React from 'react';
// import store from "./redux/redux-store";
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import store, {RootStateType, StoreType} from "./redux/store";


const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App store={store}/>
        </BrowserRouter>, document.getElementById('root')
    );
}
rerenderEntireTree(store.getState());


store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});
