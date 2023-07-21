import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ProfilePageActionsType} from "./profileReducer";
import dialoguesReducer, {DialoguesPageActionsType} from "./dialoguesReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer, {UsersActionsType} from "./usersReducer";
import authReducer, {AuthActionsType} from "./authReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer, {AppActionsType} from "./appReducer";

export type ActionsType =
    | ProfilePageActionsType
    | DialoguesPageActionsType
    | UsersActionsType
    | AuthActionsType
    | AppActionsType;

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialoguesPage: dialoguesReducer, //+
    sidebar: sidebarReducer, //+
    usersPage: usersReducer, //+
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

export type AppStateType = ReturnType<typeof rootReducer>
let store = createStore(rootReducer, applyMiddleware(thunk));
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>


//@ts-ignore
window.store = store;

export default store;