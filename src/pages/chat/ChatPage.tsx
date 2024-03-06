import React, {useEffect, useState} from 'react';

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string
    photo: string
    userId: string
    userName: string
}

const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

export default ChatPage


const Chat = () => {

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    );
};


const Messages = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {
            setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
        })
    }, [])

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

    const sendMessage = () => {
        if (!message) return
        ws.send(message)
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};


