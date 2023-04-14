import React, {ChangeEvent} from "react";
import s from "./Dialogues.module.css";
import Message from "./Message/Message";
import DialogueItem from "./DialogueItem/DialogueItem";
import {DialogueType, MessageType} from "../../App";
import {sendMessageCreator, updateNewMessageTextCreator} from "../../redux/dialoguesReducer";


type DialoguesPageType = {
    dialogues: DialogueType[]
    messages: MessageType[]
    newMessageText: string
}

type DialoguesPropsType = {
    state: DialoguesPageType
    dispatch: (action: any) => void
}


const Dialogues = (props: DialoguesPropsType) => {

    let dialoguesElements = props.state.dialogues.map(d => <DialogueItem name={d.name} id={d.id}/>)
    let messagesElements = props.state.messages.map(m => <Message message={m.message} id={m.id}/>)

    let newMessage = props.state.newMessageText;


    let onSendMessageClick = () => {
        props.dispatch(sendMessageCreator());
    }

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.target.value
        props.dispatch(updateNewMessageTextCreator(text))
    }


    return (
        <div className={s.dialogues}>
            <div className={s.dialoguesItems}>{dialoguesElements}</div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div><textarea value={newMessage} onChange={onNewMessageChange} placeholder="Enter a message" style={{paddingLeft: "10px"}}></textarea></div>
                <div><button onClick={onSendMessageClick}>SEND</button></div>
            </div>
        </div>
)
}

export default Dialogues;