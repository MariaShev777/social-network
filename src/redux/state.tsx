import {RootStateType} from "../App";

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how are you?", likesCount: 15},
                {id: 2, message: "It's my first post", likesCount: 21},
                {id: 3, message: "WoW", likesCount: 25},
                {id: 4, message: "See ya", likesCount: 29}
            ],
            newPostText: 'chto-to'
        },
        dialoguesPage: {
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
        },
        sidebar: {
            friends: [
                {
                    id: 1,
                    friendName: "Richi",
                    ava: 'https://www.google.com/search?q=dog+avatar+picture&tbm=isch&ved=2ahUKEwicy4fNr6v9AhWSyyoKHUY8CQwQ2-cCegQIABAA&oq=dog+avatar+picture&gs_lcp=CgNpbWcQAzoECCMQJ1CSBli0CGDpDGgAcAB4AIABWIgB1gKSAQE0mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=bzf3Y9zXIZKXqwHG-KRg&bih=969&biw=1920#imgrc=6Zebd7wGmuJVBM'
                },
                {
                    id: 2,
                    friendName: "Musya",
                    ava: 'https://www.google.com/search?q=cat%20avatar%20profile&tbm=isch&tbs=rimg:CZ1-VGWQCy_XYejLDCY5OnhgsgIMCgIIABAAOgQIABAA&hl=ru&sa=X&ved=0CBwQuIIBahcKEwiggt6PsKv9AhUAAAAAHQAAAAAQDg&biw=1903&bih=969#imgrc=nVbbKt8vPmemNM'
                },
                {
                    id: 3,
                    friendName: "Sharik",
                    ava: 'https://www.google.com/search?q=dog+picture+cute&tbm=isch&ved=2ahUKEwilwJ7msKv9AhXDuCoKHcGWAvwQ2-cCegQIABAA&oq=dog+picture+cute&gs_lcp=CgNpbWcQAzIHCAAQgAQQEzIHCAAQgAQQEzIICAAQBxAeEBMyCAgAEAgQHhATMggIABAIEB4QEzIICAAQCBAeEBMyCAgAEAgQHhATMggIABAIEB4QEzIICAAQCBAeEBMyCAgAEAgQHhATOgQIIxAnUP4FWP4FYJ8HaABwAHgAgAFbiAG1AZIBATKYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=sDj3Y6WoMMPxqgHBrYrgDw&bih=969&biw=1903&hl=ru#imgrc=OuN2RLRD8b4IWM&imgdii=u61zC0xCLTOo1M'
                }
            ]
        }
    },
    _callSubscriber (state: RootStateType) {
        console.log('state has been changed');
    },

    getState () {
        return this._state;
    },
    subscribe(observer: (state: RootStateType) => void) {
        this._callSubscriber = observer;
    },

    dispatch (action: any) {
        if (action.type === ADD_POST) {
            const newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT){
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }

    }
}

export const addPostActionCreator = () => ({type: ADD_POST});

export const updateNewPostTextActionCreator = (text: string) => (
    {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
)

// export const updateNewPostTextActionCreator = (text: string) => {
//     return {
//         type: UPDATE_NEW_POST_TEXT,
//         newText: text
//     } as const
// }



export default store;


// @ts-ignore
window.store = store;

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