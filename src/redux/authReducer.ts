import {authAPI, securityAPI} from "../api/api";
import {AppStateType, AppThunk} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkDispatch} from "redux-thunk";

export type AuthActionsType = ReturnType<typeof setAuthUserDataAC> | ReturnType<typeof getCaptchaUrlAC>;

type AuthType = typeof initialState

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    photo: null as string | null,
    captchaUrl: null as string | null
};

const authReducer = (state = initialState, action: AuthActionsType): AuthType => {
    switch (action.type) {
        case "auth/SET-USER-DATA":
        case "auth/GET-CAPTCHA-URL": {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}

export const setAuthUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: "auth/SET-USER-DATA",
        payload: {id, email, login, isAuth}
    } as const
}

export const getCaptchaUrlAC = (captchaUrl: string) => {
    return {
        type: "auth/GET-CAPTCHA-URL",
        payload: {captchaUrl}
    } as const
}


export const getAuthUserDataTC = () => async (dispatch: ThunkDispatch<AppStateType, unknown, AuthActionsType | FormAction>) => {
    let response = await authAPI.logInMe();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserDataAC(id, email, login, true));
    }
}


export const logInTC = (email: string, password: string, rememberMe: boolean, captcha: string) =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, AuthActionsType | FormAction>) => {
        let response = await authAPI.logIn(email, password, rememberMe, captcha);
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserDataTC());
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrlTC())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: message}));
        }
    }

export const getCaptchaUrlTC = (): AppThunk => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captcha = response.data.url;
    dispatch(getCaptchaUrlAC(captcha));
}

export const logOutTC = (): AppThunk => async (dispatch) => {
    let response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false));
    }
}


export default authReducer;