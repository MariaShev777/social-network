import {AppStateType} from "./redux-store";
import {FormAction} from "redux-form";
import {ThunkDispatch} from "redux-thunk";
import {getAuthUserDataTC} from "./authReducer";

export type AppActionsType = ReturnType<typeof initialisedSuccessfullyAC>

type AppType = {
    initialised: boolean
}

let initialState = {
    initialised: false
}

const appReducer = (state = initialState, action: AppActionsType): AppType => {
    switch (action.type) {
        case 'app/INITIALISED-SUCCESSFULLY': {
            return {
                ...state,
                initialised: true
            }
        }
        default:
            return state;
    }
}


export const initialisedSuccessfullyAC = () => ({type: 'app/INITIALISED-SUCCESSFULLY'} as const)

export const initialiseAppTC = () => (dispatch: ThunkDispatch<AppStateType, unknown, AppActionsType | FormAction>) => {
    let promise = dispatch(getAuthUserDataTC());

    promise.then(() => {
        dispatch(initialisedSuccessfullyAC());
    })
}

export default appReducer;