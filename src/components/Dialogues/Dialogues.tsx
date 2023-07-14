import React from "react";
import s from "./Dialogues.module.css";
import Message from "./Message/Message";
import DialogueItem from "./DialogueItem/DialogueItem";
import {DialoguesPropsType} from "./DialoguesContainer";
import {AddFormDataType, AddMessageFormRedux} from "./AddMessageForm/AddMessageForm";


const Dialogues = (props: DialoguesPropsType) => {

    let state = props.dialoguesPage;

    let dialoguesElements = state.dialogues.map(d => <DialogueItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message message={m.message} id={m.id}/>)

    // let newMessage = state.newMessageText;


    let addNewMessage = (values: AddFormDataType) => {
        props.sendMessage(values.newMessage);
    }


    return (
        <div className={s.dialogues}>
            <div className={s.dialoguesItems}>{dialoguesElements}</div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
)
}




export default Dialogues;