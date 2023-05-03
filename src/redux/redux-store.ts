import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialoguesReducer from "./dialoguesReducer";
import sidebarReducer from "./sidebarReducer";
import {StoreType} from "./store";


let reducers = combineReducers({
    profilePage: profileReducer,
    dialoguesPage: dialoguesReducer,
    sidebar: sidebarReducer
});


let store: StoreType = createStore(reducers);

export default store;