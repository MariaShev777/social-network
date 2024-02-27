import {AppThunk} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {ResultCode} from "../types/enum";
import {authAPI} from "../api/authApi";
import {securityAPI} from "../api/securityApi";

export type AuthActionsType = ReturnType<typeof setAuthUserDataAC> | ReturnType<typeof getCaptchaUrlAC>;

type AuthType = typeof initialState

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
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

export const getCaptchaUrlAC = (captchaUrl: string) => ({type: "auth/GET-CAPTCHA-URL", payload: {captchaUrl}} as const)



export const getAuthUserDataTC = (): AppThunk<AuthActionsType | FormAction, Promise<any>> => async (dispatch) => {
    let response = await authAPI.me();
    if (response.resultCode === ResultCode.Success) {
        let {id, email, login} = response.data
        dispatch(setAuthUserDataAC(id, email, login, true));
    }
}

export const logInTC = (email: string, password: string, rememberMe: boolean, captcha: string): AppThunk<AuthActionsType | FormAction> =>
    async (dispatch) => {
        let response = await authAPI.logIn(email, password, rememberMe, captcha);
        if (response.resultCode === ResultCode.Success) {
            dispatch(getAuthUserDataTC());
        } else {
            if (response.resultCode === ResultCode.CaptchaIsRequired) {
                dispatch(getCaptchaUrlTC())
            }
            let message = response.messages.length > 0 ? response.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: message}));
        }
    }

export const getCaptchaUrlTC = (): AppThunk<AuthActionsType> => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captcha = data.url;
    dispatch(getCaptchaUrlAC(captcha));
}

export const logOutTC = (): AppThunk<AuthActionsType> => async (dispatch) => {
    let response = await authAPI.logOut()
    if (response.data.resultCode === ResultCode.Success) {
        dispatch(setAuthUserDataAC(null, null, null, false));
    }
}


export default authReducer;