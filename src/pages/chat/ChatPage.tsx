import React, {useEffect, useState} from 'react';
import {ChatMessageType} from "api/chatApi";
import {sendMessage, startMessagesListening, stopMessagesListening} from "redux/chatReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "redux/store";


const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

export default ChatPage


const Chat = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    );
};


const Messages = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    );
};


const Message = ({message}: { message: ChatMessageType }) => {

    return (
        <div style={{color: 'black'}}>
            <img src={message.photo} width={36}/>
            <b>{message.userName}</b>
            {message.message}
            <hr/>
        </div>
    );
};


const AddMessageForm = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const dispatch = useDispatch()

    const openHandler = () => {
        setReadyStatus('ready')
    }


    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={false} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    );
};


