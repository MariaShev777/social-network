import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialoguesReducer from "./dialoguesReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";


export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialoguesPage: dialoguesReducer, //+
    sidebar: sidebarReducer, //+
    usersPage: usersReducer //+
});

export type AppStateType = ReturnType<typeof rootReducer>
let store: AppStateType = createStore(rootReducer);

//@ts-ignore
window.store = store;

export default store;