import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialoguesReducer from "./dialoguesReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./appReducer";
import chatReducer from "redux/chatReducer";


export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialoguesPage: dialoguesReducer, //+
    sidebar: sidebarReducer, //+
    usersPage: usersReducer, //+
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
});


export type AppStateType = ReturnType<typeof rootReducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


export type AppThunk<A extends Action, R = void> = ThunkAction<R, AppStateType, unknown, A>


//@ts-ignore
window.__store__ = store;

export default store;