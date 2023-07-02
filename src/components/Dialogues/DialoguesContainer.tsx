import React from "react";
import {DialoguesPageType, sendMessageCreator, updateNewMessageTextCreator} from "../../redux/dialoguesReducer";
import Dialogues from "./Dialogues";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type MapStatePropsType = {
    dialoguesPage: DialoguesPageType
}

type MapDispatchPropsType = {
    updateNewMessageText: (text: string) => void
    sendMessage: () => void
}

export type DialoguesPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialoguesPage: state.dialoguesPage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewMessageText: (text: string) => {
            dispatch(updateNewMessageTextCreator(text))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator());
        }
    }
}


let AuthRedirectComponent = withAuthRedirect(Dialogues);

export const DialoguesContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent)
