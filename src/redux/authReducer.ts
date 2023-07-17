import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppStateType, AppThunk} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkDispatch} from "redux-thunk";


export type AuthActionsType = SetAuthUserDataACType


type AuthType = {
    id: number
    email: string
    login: string
    isAuth: boolean
}

let initialState = {
    id: 0,
    email: '',
    login: '',
    isAuth: false
};

const authReducer = (state = initialState, action: AuthActionsType): AuthType => {

        switch (action.type) {
            case 'SET-USER-DATA': {
                return {
                    ...state,
                    ...action.payload
                }
            }
            default:
                return state;
        }
    }


export type SetAuthUserDataACType = ReturnType<typeof setAuthUserDataAC>

export const setAuthUserDataAC = (id: number, email: string , login: string , isAuth: boolean) => {
    return {
        type: "SET-USER-DATA",
        payload: {id, email, login, isAuth}
    } as const
}


export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
    authAPI.logInMe()
        .then(res => {
            if (res.data.resultCode === 0) {
                let {id, email, login} = res.data.data
                dispatch(setAuthUserDataAC(id, email, login, true));
            }
        })
}


export const logInTC = (email: string, password: string, rememberMe: boolean = false) => (dispatch: ThunkDispatch<AppStateType, unknown, AuthActionsType | FormAction>) => {

    authAPI.logIn(email, password, rememberMe)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(getAuthUserDataTC());
            } else {
               let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
                dispatch(stopSubmit('login', {_error: message}));
            }
        })
}


export const logOutTC = ():AppThunk => (dispatch) => {
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(0, '', '', false));
            }
        })
}


export default authReducer;