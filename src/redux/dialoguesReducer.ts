import {DialoguesPageType} from "./store";


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

export type DialoguesPageActionsType = UpdateNewMessageTextCreatorType | SendMessageCreatorType;

const dialoguesReducer = (state: DialoguesPageType = initialState, action: DialoguesPageActionsType) => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-TEXT': {
            state.newMessageText = action.newMsgText;
            return state;
        }
        case
        "SEND-MESSAGE": {
            let newMsgText = state.newMessageText;
            state.newMessageText = "";
            state.messages.push({id: 6, message: newMsgText});
            return state;
        }
        default:
            return state
    }
}

type UpdateNewMessageTextCreatorType = ReturnType<typeof updateNewMessageTextCreator>

type SendMessageCreatorType = ReturnType<typeof sendMessageCreator>

export const updateNewMessageTextCreator = (text: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-TEXT',
        newMsgText: text
    } as const
}

export const sendMessageCreator = () => ({type: "SEND-MESSAGE"} as const)

export default dialoguesReducer;