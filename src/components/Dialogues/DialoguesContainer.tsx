import React, {ChangeEvent} from "react";


import {sendMessageCreator, updateNewMessageTextCreator} from "../../redux/dialoguesReducer";
import Dialogues from "./Dialogues";

type DialoguesContainerPropsType = {
    store: any
}


const DialoguesContainer = (props: DialoguesContainerPropsType) => {

    let state = props.store.getState().dialoguesPage;


    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator());
    }

    let onNewMessageChange = (text: string) => {
        props.store.dispatch(updateNewMessageTextCreator(text))
    }


    return <Dialogues updateNewMessageText={onNewMessageChange} sendMessage={onSendMessageClick} dialoguesPage={state}/>
}

export default DialoguesContainer;