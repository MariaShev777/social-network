import {combineReducers, createStore} from "redux";
import profileReducer, {ProfilePageActionsType} from "./profileReducer";
import dialoguesReducer, {DialoguesPageActionsType} from "./dialoguesReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer, {UsersActionsType} from "./usersReducer";
import authReducer, {AuthActionsType} from "./authReducer";

export type ActionsType =
    | ProfilePageActionsType
    | DialoguesPageActionsType
    | UsersActionsType
    | AuthActionsType;

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialoguesPage: dialoguesReducer, //+
    sidebar: sidebarReducer, //+
    usersPage: usersReducer, //+
    auth: authReducer
});

export type AppStateType = ReturnType<typeof rootReducer>
let store = createStore(rootReducer);

//@ts-ignore
window.store = store;

export default store;