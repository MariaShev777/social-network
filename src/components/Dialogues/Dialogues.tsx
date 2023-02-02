import React from 'react';
import s from './Dialogues.module.css';
import {NavLink} from "react-router-dom";

type DialogueItemType = {
    name: string
    id: number
}

type MessageType = {
    message: string;
}


        const DialogueItem = (props: DialogueItemType) => {
            let path = '/dialogues/' + props.id;

            return (
                <div className={s.dialogue + ' ' + s.active}>
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
    return (
        <div className={s.dialogues}>
            <div className={s.dialoguesItems}>
                <DialogueItem name={'Barsik'} id={1}/>
                <DialogueItem name={'Richi'} id={2}/>
                <DialogueItem name={'Musya'} id={3}/>
                <DialogueItem name={'Sharik'} id={4}/>
                <DialogueItem name={'Lessi'} id={5}/>
            </div>
            <div className={s.messages}>
                <Message message={'Meeooww'} />
                <Message message={'Wanna play?'} />
                <Message message={'I would eat all day looooong'} />
                <Message message={'Prr-r-rrr'} />
                <Message message={'Prr-r-rrr'} />
            </div>
        </div>
    )
}

export default Dialogues;