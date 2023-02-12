import React from "react";
import s from "./Dialogues.module.css";
import Message from "./Message/Message";
import DialogueItem from "./DialogueItem/DialogueItem";



const Dialogues = () => {

    let dialogues = [
        {id: 1, name: "Barsik"},
        {id: 2, name: "Richi"},
        {id: 3, name: "Musya"},
        {id: 4, name: "Sharik"},
        {id: 5, name: "Lessi"}
    ];

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