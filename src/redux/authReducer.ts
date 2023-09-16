import {authAPI} from "../api/api";
import {AppStateType, AppThunk} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkDispatch} from "redux-thunk";


export type AuthActionsType = SetAuthUserDataACType


type AuthType = {
    id: number
    email: string
    login: string
    isAuth: boolean
    photo: string
}

let initialState = {
    id: 0,
    email: '',
    login: '',
    isAuth: false,
    photo: ''
};

const authReducer = (state = initialState, action: AuthActionsType): AuthType => {

        switch (action.type) {
            case 'auth/SET-USER-DATA': {
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
        type: 'auth/SET-USER-DATA',
        payload: {id, email, login, isAuth}
    } as const
}


export const getAuthUserDataTC = () => async (dispatch: ThunkDispatch<AppStateType, unknown, AuthActionsType | FormAction>) => {
    let response = await authAPI.logInMe();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserDataAC(id, email, login, true));
    }
}


export const logInTC = (email: string, password: string, rememberMe: boolean = false) => async (dispatch: ThunkDispatch<AppStateType, unknown, AuthActionsType | FormAction>) => {

    let response = await authAPI.logIn(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataTC());
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}));
    }
}


export const logOutTC = ():AppThunk => async(dispatch) => {
    let response = await authAPI.logOut()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(0, '', '', false));
            }
}


export default authReducer;