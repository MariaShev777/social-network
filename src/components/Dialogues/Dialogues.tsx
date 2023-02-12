import React from "react";
import s from "./Dialogues.module.css";
import Message from "./Message/Message";
import DialogueItem from "./DialogueItem/DialogueItem";

type DialoguesType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    message: string
}

type DialoguesPropsType = {
    dialogues: DialoguesType[]
    messages: MessagesType[]
}

const Dialogues = (props: DialoguesPropsType) => {

    let dialoguesElements = props.dialogues.map(d => <DialogueItem name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map(m => <Message message={m.message} id={m.id}/>)


    return (
        <div className={s.dialogues}>
            <div className={s.dialoguesItems}>{dialoguesElements}</div>
            <div className={s.messages}>{messagesElements}</div>
        </div>
    )
}

export default Dialogues;