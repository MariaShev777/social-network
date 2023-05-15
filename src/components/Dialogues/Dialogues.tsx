import React, {ChangeEvent} from "react";
import s from "./Dialogues.module.css";
import Message from "./Message/Message";
import DialogueItem from "./DialogueItem/DialogueItem";
import {DialogueType, MessageType} from "../../redux/store";


type DialoguesPageType = {
    dialogues: DialogueType[]
    messages: MessageType[]
    newMessageText: string
}

type DialoguesPropsType = {
    dialoguesPage: DialoguesPageType
    updateNewMessageText: (text: string) => any
    sendMessage: () => void
}


const Dialogues = (props: DialoguesPropsType) => {

    let state = props.dialoguesPage;

    let dialoguesElements = state.dialogues.map(d => <DialogueItem name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message message={m.message} id={m.id}/>)

    let newMessage = state.newMessageText;


    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.target.value;
        props.updateNewMessageText(text);
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