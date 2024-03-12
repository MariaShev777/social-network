import React, {useEffect, useRef, useState} from 'react';
import {ChatMessageAPIType} from "api/chatApi";
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
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
            <>
                <Messages/>
                <AddMessageForm/>
            </>
        </div>
    );
};


const Messages = React.memo(() => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setAutoScroll] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setAutoScroll(true)
        } else {
            isAutoScroll && setAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])


    return (
        <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m) => <Message key={m.id} message={m}/>)}
            <div ref={messagesRef}></div>
        </div>
    );
});


const Message = ({message}: { message: ChatMessageAPIType }) => {
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
    const status = useSelector((state: AppStateType) => state.chat.status)
    const dispatch = useDispatch()


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
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    );
};


