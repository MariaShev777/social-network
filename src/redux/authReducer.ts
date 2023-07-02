import {authAPI} from "../api/api";
import {Dispatch} from "redux";

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
                    ...action.data,
                    isAuth: true
                }
            }
            default:
                return state;
        }
    }


export type SetAuthUserDataACType = ReturnType<typeof setAuthUserDataAC>

export const setAuthUserDataAC = (id: number, email: string, login: string) => {
    return {
        type: "SET-USER-DATA",
        data: {id, email, login}
    } as const
}


export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
    authAPI.logIn()
        .then(res => {
            if (res.data.resultCode === 0) {
                let {id, email, login} = res.data.data
                // this.props.toggleFetching(false);
                dispatch(setAuthUserDataAC(id, email, login));
            }
        })
}



export default authReducer;