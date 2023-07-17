import {Dispatch} from "redux";
import {profileAPI} from "../api/api";

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
    userId: number
    fullName: string
    photos: PhotoType
}

export type ProfilePageType = {
    posts: PostType[]
    profile: ProfileType
    status: string
}

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 15},
        {id: 2, message: "It's my first post", likesCount: 21},
        {id: 3, message: "WoW", likesCount: 25},
        {id: 4, message: "See ya", likesCount: 29}
    ],
    profile: {
        userId: 0,
        fullName: '',
        photos: {
            small: '',
            large: ''
        },
    },
    status: ''
};



export type ProfilePageActionsType =
    | AddPostActionCreatorType
    | SetUserProfileActionType
    | SetStatusActionType;

const profileReducer = (state = initialState, action: ProfilePageActionsType):ProfilePageType => {
    switch (action.type) {
        case "ADD-POST": {
            const newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }

        case 'SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }

        case 'SET_STATUS': {
            return {...state, status: action.status}
        }

        default:
            return state
    }
}
export type AddPostActionCreatorType = ReturnType<typeof addPostActionCreator>

export const addPostActionCreator = (newPostText: string) => ({type: "ADD-POST", newPostText} as const);


export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
export const setUserProfile = (profile: any) => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    } as const
}

export type SetStatusActionType = ReturnType<typeof setStatus>
export const setStatus = (status: string) => {
    return {
        type: 'SET_STATUS',
        status
    } as const
}



export const getUserProfileTC = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getProfile(userId)
        .then((response) => {
            dispatch(setUserProfile(response.data));
        })
}


export const getStatusTC = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then((response) => {
            dispatch(setStatus(response.data));
        })
}


export const updateStatusTC = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(response.data));
            }
        })
}


export default profileReducer;