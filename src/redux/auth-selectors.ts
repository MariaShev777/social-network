import {AppStateType} from "redux/store";

export const getIsAuthSelector = (state: AppStateType) => state.auth.isAuth
export const getLoginSelector = (state: AppStateType) => state.auth.login
