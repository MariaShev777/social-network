import React from "react";
import s from "./../Dialogues.module.css";



type MessageType = {
    message: string
    id: number
}


const Message = (props: MessageType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}


export default Message;