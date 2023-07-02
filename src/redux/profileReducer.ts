import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type PhotoType = {
    small: string
    large: string
}


export type ProfileType = {
    userId: string
    fullName: string
    photos: PhotoType
}

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 15},
        {id: 2, message: "It's my first post", likesCount: 21},
        {id: 3, message: "WoW", likesCount: 25},
        {id: 4, message: "See ya", likesCount: 29}
    ] as PostType[],
    newPostText: "chto-to",
    profile: {
        userId: '',
        fullName: '',
        photos: {
            small: '',
            large: ''
        }
    } as ProfileType
};

export type ProfilePageType = typeof initialState

export type ProfilePageActionsType =
    | AddPostActionCreatorType
    | UpdateNewPostTextActionCreatorType
    | SetUserProfileActionType;

const profileReducer = (state: ProfilePageType = initialState, action: ProfilePageActionsType):ProfilePageType => {
    switch (action.type) {
        case "ADD-POST": {
            const newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            };
        }

        case "UPDATE-NEW-POST-TEXT": {
            return {
                ...state,
                newPostText: action.newText
            };
        }

        case 'SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }

        default:
            return state
    }
}
export type AddPostActionCreatorType = ReturnType<typeof addPostActionCreator>

export type UpdateNewPostTextActionCreatorType = ReturnType<typeof updateNewPostTextActionCreator>

export const addPostActionCreator = () => ({type: "ADD-POST"} as const);

export const updateNewPostTextActionCreator = (text: string) => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: text
    } as const
}

export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
export const setUserProfile = (profile: any) => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    } as const
}


export const getUserProfileTC = (userId: string) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId)
        .then((response) => {
            dispatch(setUserProfile(response.data));
        })
}



export default profileReducer;