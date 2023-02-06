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

    let dialoguesData = [
        {id: 1, name: "Barsik"},
        {id: 2, name: "Richi"},
        {id: 3, name: "Musya"},
        {id: 4, name: "Sharik"},
        {id: 5, name: "Lessi"},
    ]

    let messagesData = [
        {id: 1, message: "Meeooww"},
        {id: 2, message: "Wanna play?"},
        {id: 3, message: "I would eat all day looooong"},
        {id: 4, message: "Prr-r-rrr"},
        {id: 5, message: "Prr-r-rrr"},
    ]


    return (
        <div className={s.dialogues}>
            <div className={s.dialoguesItems}>
                <DialogueItem name={dialoguesData[0].name} id={dialoguesData[0].id}/>
                <DialogueItem name={dialoguesData[1].name} id={dialoguesData[1].id}/>
                {/*<DialogueItem name={"Richi"} id={2}/>*/}
                {/*<DialogueItem name={"Musya"} id={3}/>*/}
                {/*<DialogueItem name={"Sharik"} id={4}/>*/}
                {/*<DialogueItem name={"Lessi"} id={5}/>*/}
            </div>
            <div className={s.messages}>
                <Message message={messagesData[0].message} id={messagesData[0].id}/>
                <Message message={messagesData[1].message} id={messagesData[1].id}/>
                {/*<Message message={"Wanna play?"}/>*/}
                {/*<Message message={"I would eat all day looooong"}/>*/}
                {/*<Message message={"Prr-r-rrr"}/>*/}
                {/*<Message message={"Prr-r-rrr"}/>*/}
            </div>
        </div>
    )
}

export default Dialogues;