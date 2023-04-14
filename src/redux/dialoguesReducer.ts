import {DialoguesPageType} from "../App";

const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'
const SEND_MESSAGE = "SEND-MESSAGE"

const dialoguesReducer = (state: DialoguesPageType, action: any) => {
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