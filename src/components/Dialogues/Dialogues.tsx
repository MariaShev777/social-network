import React from "react";
import s from "./Dialogues.module.css";
import Message from "./Message/Message";
import DialogueItem from "./DialogueItem/DialogueItem";
import {DialogueType, MessageType} from "../../App";


type DialoguesPageType = {
    dialogues: DialogueType[]
    messages: MessageType[]
}

type DialoguesPropsType = {
    state: DialoguesPageType
    // addMessage: () => void
}


const Dialogues = (props: DialoguesPropsType) => {

    let dialoguesElements = props.state.dialogues.map(d => <DialogueItem name={d.name} id={d.id}/>)
    let messagesElements = props.state.messages.map(m => <Message message={m.message} id={m.id}/>)

    let newMessage = React.createRef<HTMLTextAreaElement>()


    let addMessageChangeHandler = () => {
        // props.addMessage()
    }


    let onMessageChange = () => {
    //     let text = newMessage.current?.value;
    //     if (text) {
    //         props.updateMessagesText(text);
    //     }
    }

    return (
        <div className={s.dialogues}>
            <div className={s.dialoguesItems}>{dialoguesElements}</div>
            <div className={s.messages}>{messagesElements}</div>
            <span style={{paddingLeft: '10px'}}>
                <textarea onChange={onMessageChange} ref={newMessage} style={{paddingLeft: '10px'}}></textarea>
                <button onClick={addMessageChangeHandler}>ADD</button>
            </span>
        </div>
    )
}

export default Dialogues;