import React from "react";
import s from './dialogues.module.css'
import DialogueItem from "components/dialogues/dialogue-item/DialogueItem";
import {DialoguesPropsType} from "components/dialogues/DialoguesContainer";
import Message from "components/dialogues/message/Message";
import AddMessageForm from "components/dialogues/add-message-form/AddMessageForm";


export type AddFormData = {
    newMessage: string
}

const Dialogues = (props: DialoguesPropsType) => {

    let state = props.dialoguesPage;

    let dialoguesElements = state.dialogues.map(d => <DialogueItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message message={m.message}/>)

    let addNewMessage = (values: AddFormData) => {
        props.sendMessage(values.newMessage);
    }

    return (
        <div className={s.dialogues}>
            <div className={s.dialoguesItems}>{dialoguesElements}</div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogues;