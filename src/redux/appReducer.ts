import {AppThunk} from "redux/store";
import {FormAction} from "redux-form";
import {getAuthUserData} from "./authReducer";

export type AppActionsType = ReturnType<typeof initialisedSuccessfully>

type AppType = typeof initialState

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


export const initialisedSuccessfully = () => ({type: 'app/INITIALISED-SUCCESSFULLY'} as const)

export const initialiseApp = ():AppThunk<AppActionsType | FormAction> => (dispatch) => {
    let promise = dispatch(getAuthUserData());

    promise.then(() => {
        dispatch(initialisedSuccessfully());
    })
}

export default appReducer;