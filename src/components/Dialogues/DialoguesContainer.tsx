import React from "react";
import {DialoguesPageType, sendMessageCreator} from "redux/dialoguesReducer";
import Dialogues from "./Dialogues";
import {connect} from "react-redux";
import {AppStateType} from "redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "hoc/withAuthRedirect";


type MapStatePropsType = {
    dialoguesPage: DialoguesPageType
}

type MapDispatchPropsType = {
    sendMessage: (newMessage: string) => void
}

export type DialoguesPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialoguesPage: state.dialoguesPage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: (newMessage: string) => {
            dispatch(sendMessageCreator(newMessage));
        }
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogues)
