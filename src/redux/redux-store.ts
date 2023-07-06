import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ProfilePageActionsType} from "./profileReducer";
import dialoguesReducer, {DialoguesPageActionsType} from "./dialoguesReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer, {UsersActionsType} from "./usersReducer";
import authReducer, {AuthActionsType} from "./authReducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form';

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
    auth: authReducer,
    form: formReducer
});

export type AppStateType = ReturnType<typeof rootReducer>
let store = createStore(rootReducer, applyMiddleware(thunk));

//@ts-ignore
window.store = store;

export default store;