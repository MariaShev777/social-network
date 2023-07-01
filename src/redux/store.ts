import profileReducer, {ProfilePageActionsType} from "./profileReducer";
import dialoguesReducer, {DialoguesPageActionsType} from "./dialoguesReducer";


export type ActionsType = ProfilePageActionsType | DialoguesPageActionsType;

export type MessageType = {
    id: number
    message: string
}
export type DialogueType = {
    id: number
    name: string
}

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type FriendsType = {
    id: number
    friendName: string
    ava: string
}

export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}
export type DialoguesPageType = {
    dialogues: DialogueType[]
    messages: MessageType[]
    newMessageText: string
}

export type SidebarType = {
    friends: FriendsType[]
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialoguesPage: DialoguesPageType
    sidebar: SidebarType
}

export type StoreType = {
    _state:  RootStateType
    _callSubscriber: (state: RootStateType) => void
    getState: () => RootStateType
    subscribe: (observer: (state: RootStateType) => void) => void
    dispatch: (action: ActionsType) => void
}

// let store: StoreType = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: 1, message: "Hi, how are you?", likesCount: 15},
//                 {id: 2, message: "It's my first post", likesCount: 21},
//                 {id: 3, message: "WoW", likesCount: 25},
//                 {id: 4, message: "See ya", likesCount: 29}
//             ],
//             newPostText: 'chto-to'
//         },
//         dialoguesPage: {
//             dialogues: [
//                 {id: 1, name: "Barsik"},
//                 {id: 2, name: "Richi"},
//                 {id: 3, name: "Musya"},
//                 {id: 4, name: "Sharik"},
//                 {id: 5, name: "Lessi"},
//                 {id: 6, name: "Kubik"}
//             ],
//             messages: [
//                 {id: 1, message: "Meeooww"},
//                 {id: 2, message: "Wanna play?"},
//                 {id: 3, message: "I would eat all day looooong"},
//                 {id: 4, message: "Prr-r-rrr"},
//                 {id: 5, message: "Prr-r-rrr"}
//             ],
//             newMessageText: ''
//         },
//         sidebar: {
//             friends: [
//                 {
//                     id: 1,
//                     friendName: "Richi",
//                     ava: richi
//                 },
//                 {
//                     id: 2,
//                     friendName: "Musya",
//                     ava: musya
//                 },
//                 {
//                     id: 3,
//                     friendName: "Sharik",
//                     ava: sharik
//                 }
//             ]
//         }
//     },
//     _callSubscriber(state: RootStateType) {
//         console.log('state has been changed');
//     },
//
//     getState() {
//         return this._state;
//     },
//     subscribe(observer: (state: RootStateType) => void) {
//         this._callSubscriber = observer;
//     },
//
//     // dispatch(action: ActionsType ) {
//     //     this._state.profilePage = profileReducer(this._state.profilePage, action)
//     //     this._state.dialoguesPage = dialoguesReducer(this._state.dialoguesPage, action)
//     //     this._state.sidebar = sidebarReducer(this._state.sidebar, action)
//     //
//     //     this._callSubscriber(this._state);
//     // }
// }



// export const updateNewPostTextActionCreator = (text: string) => {
//     return {
//         type: UPDATE_NEW_POST_TEXT,
//         newText: text
//     } as const
// }



// export default store;


// @ts-ignore
// window.store = store;

// export const addMessage = () => {
//
//     const newMessage = {
//         id: 5,
//         message: state.profilePage.newPostText,
//         likesCount: 0
//     };
//
//     state.profilePage.posts.push(newPost);
//     state.profilePage.newPostText = '';
//     rerenderEntireTree(state);
// }
//
//
//
// export const updateMessagesText = (newText: string) => {
//     state.profilePage.newPostText = newText;
//     rerenderEntireTree(state);
// }