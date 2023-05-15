import React from "react";
import {sendMessageCreator, updateNewMessageTextCreator} from "../../redux/dialoguesReducer";
import Dialogues from "./Dialogues";
import {connect} from "react-redux";
import {RootStateType, StoreType} from "../../redux/store";


let mapStateToProps = (state: RootStateType) => {
    return {
        dialoguesPage: state.dialoguesPage
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        updateNewMessageText: (text: string) => {
            dispatch(updateNewMessageTextCreator(text))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator());
        }
    }
}

const DialoguesContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogues)

export default DialoguesContainer;