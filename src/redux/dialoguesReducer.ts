import {DialoguesPageType} from "../App";

const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'
const SEND_MESSAGE = "SEND-MESSAGE"


let initialState = {
    dialogues: [
        {id: 1, name: "Barsik"},
        {id: 2, name: "Richi"},
        {id: 3, name: "Musya"},
        {id: 4, name: "Sharik"},
        {id: 5, name: "Lessi"},
        {id: 6, name: "Kubik"}
    ],
    messages: [
        {id: 1, message: "Meeooww"},
        {id: 2, message: "Wanna play?"},
        {id: 3, message: "I would eat all day looooong"},
        {id: 4, message: "Prr-r-rrr"},
        {id: 5, message: "Prr-r-rrr"}
    ],
    newMessageText: ""
};


const dialoguesReducer = (state: DialoguesPageType = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT: {
            state.newMessageText = action.newMsgText;
            return state;
        }
        case
        SEND_MESSAGE: {
            let newMsgText = state.newMessageText;
            state.newMessageText = "";
            state.messages.push({id: 6, message: newMsgText});
            return state;
        }
        default:
            return state
    }
}

export const updateNewMessageTextCreator = (text: string) => (
    {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newMsgText: text
    }
)

export const sendMessageCreator = () => ({type: SEND_MESSAGE})

export default dialoguesReducer;