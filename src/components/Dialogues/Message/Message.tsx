import React from "react";
import s from "./../Dialogues.module.css";

type Props = {
    message: string
}

const Message = (props: Props) => {
    return <div className={s.message}>{props.message}</div>
}

export default Message;