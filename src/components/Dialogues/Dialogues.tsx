import React from "react";
import s from "./Dialogues.module.css";
import {NavLink} from "react-router-dom";

type DialogueItemType = {
    name: string
    id: number
}

type MessageType = {
    message: string
    id: number
}


const DialogueItem = (props: DialogueItemType) => {
    let path = "/dialogues/" + props.id;

    return (
        <div className={s.dialogue + " " + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props: MessageType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}


const Dialogues = () => {

    let dialogues = [
        {id: 1, name: "Barsik"},
        {id: 2, name: "Richi"},
        {id: 3, name: "Musya"},
        {id: 4, name: "Sharik"},
        {id: 5, name: "Lessi"},
    ]

    let messages = [
        {id: 1, message: "Meeooww"},
        {id: 2, message: "Wanna play?"},
        {id: 3, message: "I would eat all day looooong"},
        {id: 4, message: "Prr-r-rrr"},
        {id: 5, message: "Prr-r-rrr"},
    ]

    let dialoguesElements = dialogues.map(d => <DialogueItem name={d.name} id={d.id}/>)
    let messagesElements = messages.map(m => <Message message={m.message} id={m.id}/>)


    return (
        <div className={s.dialogues}>
            <div className={s.dialoguesItems}>{dialoguesElements}</div>
            <div className={s.messages}>{messagesElements}</div>
        </div>
    )
}

export default Dialogues;