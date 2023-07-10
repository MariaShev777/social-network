import React, {ChangeEvent} from "react";
import s from "./Dialogues.module.css";
import Message from "./Message/Message";
import DialogueItem from "./DialogueItem/DialogueItem";
import {DialoguesPropsType} from "./DialoguesContainer";
import {Field, reduxForm} from "redux-form";


const Dialogues = (props: DialoguesPropsType) => {

    let state = props.dialoguesPage;

    let dialoguesElements = state.dialogues.map(d => <DialogueItem name={d.name} key={d.id} id={d.id}/>)
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
                <AddMessageFormRedux />
            </div>
        </div>
)
}


type AddMessageFormType = {

}

const AddMessageForm = (props: AddMessageFormType) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='newMessage' placeholder="Enter a message"/>
            </div>
            <div>
                <button>SEND</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogueAddMessageForm'})(AddMessageForm)


export default Dialogues;