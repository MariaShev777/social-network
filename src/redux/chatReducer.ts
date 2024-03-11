import {AppThunk} from "redux/store";
import {chatApi, ChatMessageType} from "api/chatApi";
import {initialisedSuccessfully} from "redux/appReducer";
import {Dispatch} from "redux";

export type ChatActions = ReturnType<typeof messagesReceived>

type ChatType = typeof initialState

let initialState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state = initialState, action: ChatActions): ChatType => {
    switch (action.type) {
        case 'chat/MESSAGES-RECEIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            }
        }
        default:
            return state;
    }
}


export const messagesReceived = (messages: ChatMessageType[]) => ({
    type: 'chat/MESSAGES-RECEIVED',
    payload: messages
} as const)

let newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (newMessageHandler === null) {
        newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return newMessageHandler
}

export const startMessagesListening = (): AppThunk<ChatActions> => (dispatch) => {
    chatApi.start()
    chatApi.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): AppThunk<ChatActions> => (dispatch) => {
    chatApi.unsubscribe(newMessageHandlerCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string): AppThunk<ChatActions> => (dispatch) => {
    chatApi.sendMessage(message)
}

export default chatReducer;