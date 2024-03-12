import {AppThunk} from "redux/store";
import {chatApi, ChatMessageAPIType, Status} from "api/chatApi";
import {Dispatch} from "redux";
import {v1} from "uuid";

export type ChatActions = ReturnType<typeof messagesReceived> | ReturnType<typeof statusChanged>

type ChatType = typeof initialState

type ChatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as Status
}

const chatReducer = (state = initialState, action: ChatActions): ChatType => {
    switch (action.type) {
        case 'chat/MESSAGES-RECEIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.map(m => ({...m, id: v1()}))].filter((m, index, array) => index >= array.length - 100)
            }
        }
        case 'chat/STATUS-CHANGED': {
            return {
                ...state,
                status: action.payload
            }
        }
        default:
            return state;
    }
}


export const messagesReceived = (messages: ChatMessageAPIType[]) => ({
    type: 'chat/MESSAGES-RECEIVED',
    payload: messages
} as const)

export const statusChanged = (status: Status) => ({
    type: 'chat/STATUS-CHANGED',
    payload: status
} as const)



let newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (newMessageHandler === null) {
        newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return newMessageHandler
}

let statusChangedHandler: ((status: Status) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (statusChangedHandler === null) {
        statusChangedHandler = (status) => {
            dispatch(statusChanged(status))
        }
    }
    return statusChangedHandler
}



export const startMessagesListening = (): AppThunk<ChatActions> => async(dispatch) => {
    chatApi.start()
    chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): AppThunk<ChatActions> => async(dispatch) => {
    chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string): AppThunk<ChatActions> => async(dispatch) => {
    chatApi.sendMessage(message)
}

export default chatReducer;