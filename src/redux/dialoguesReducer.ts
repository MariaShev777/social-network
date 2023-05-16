export type DialogueType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}


let initialState = { // тут помечать не надо типизацию
    dialogues: [
        {id: 1, name: "Barsik"},
        {id: 2, name: "Richi"},
        {id: 3, name: "Musya"},
        {id: 4, name: "Sharik"},
        {id: 5, name: "Lessi"},
        {id: 6, name: "Kubik"}
    ] as DialogueType[],
    messages: [
        {id: 1, message: "Meeooww"},
        {id: 2, message: "Wanna play?"},
        {id: 3, message: "I would eat all day looooong"},
        {id: 4, message: "Prr-r-rrr"},
        {id: 5, message: "Prr-r-rrr"}
    ] as MessageType[],
    newMessageText: ""
};

export type DialoguesPageType = typeof initialState



export type DialoguesPageActionsType = UpdateNewMessageTextCreatorType | SendMessageCreatorType;

const dialoguesReducer = (state: DialoguesPageType = initialState, action: DialoguesPageActionsType): DialoguesPageType => {
    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-TEXT":
            return {
                ...state,
                newMessageText: action.newMsgText
            };
        case "SEND-MESSAGE":
            let newMsgText = state.newMessageText;
            return {
                ...state,
                newMessageText: "",
                messages: [...state.messages, {id: 6, message: newMsgText}]
            };

        default:
            return state
    }
}

type UpdateNewMessageTextCreatorType = ReturnType<typeof updateNewMessageTextCreator>

type SendMessageCreatorType = ReturnType<typeof sendMessageCreator>

export const updateNewMessageTextCreator = (text: string) => {
    return {
        type: "UPDATE-NEW-MESSAGE-TEXT",
        newMsgText: text
    } as const
}

export const sendMessageCreator = () => ({type: "SEND-MESSAGE"} as const)

export default dialoguesReducer;