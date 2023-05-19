import {combineReducers, createStore} from "redux";
import profileReducer, {ProfilePageActionsType} from "./profileReducer";
import dialoguesReducer, {DialoguesPageActionsType} from "./dialoguesReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";

export type ActionsType = ProfilePageActionsType | DialoguesPageActionsType;

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