import React from "react";
import s from "./Dialogues.module.css";
import Message from "./Message/Message";
import DialogueItem from "./DialogueItem/DialogueItem";

type MessageType = {
    id: number
    message: string
}
type DialogueType = {
    id: number
    name: string
}

type DialoguesPageType = {
    dialogues: DialogueType[]
    messages: MessageType[]
}

type DialoguesPropsType = {
    state: DialoguesPageType
}


const Dialogues = (props: DialoguesPropsType) => {

    let dialoguesElements = props.state.dialogues.map(d => <DialogueItem name={d.name} id={d.id}/>)
    let messagesElements = props.state.messages.map(m => <Message message={m.message} id={m.id}/>)
    let newMessage = React.createRef<HTMLTextAreaElement>()


    let onClickHandler = () => {
        let message = newMessage.current?.value;
        alert(message)
    }

    return (
        <div className={s.dialogues}>
            <div className={s.dialoguesItems}>{dialoguesElements}</div>
            <div className={s.messages}>{messagesElements}</div>
            <span>
                <textarea ref={newMessage}></textarea>
                <button onClick={onClickHandler}>ADD</button>
            </span>
        </div>
    )
}

export default Dialogues;