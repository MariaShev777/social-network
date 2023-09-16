import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType, AppThunk} from "./redux-store";
import {FormAction} from "redux-form";
import {AuthActionsType} from "./authReducer";
import {ProfileFormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import Profile from "../components/Profile/Profile";

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type PhotoType = {
    small: string
    large: string
}

export type ContactsType = {
    github: string
    facebook: string
}


export type ProfileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
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
        aboutMe: '',
        lookingForAJob: true,
        lookingForAJobDescription: '',
        fullName: '',
        contacts: {
            github: '',
            facebook: ''
        },
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
    | SetStatusActionType
    | DeletePostActionType
    | SetUserProfilePhotoAT
    | SetUpdatedUserProfileAT;

const profileReducer = (state = initialState, action: ProfilePageActionsType):ProfilePageType => {
    switch (action.type) {
        case 'profile/ADD-POST': {
            const newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [newPost, ...state.posts]
            };
        }

        case 'profile/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }

        case 'profile/SET_STATUS': {
            return {...state, status: action.status}
        }
        case 'profile/DELETE_POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case 'profile/SET_USER_PROFILE_PHOTO': {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        case 'profile/SET_UPDATED_USER_PROFILE': {
            return {...state, profile: {...state.profile, ...action.profile}}
        }

        default:
            return state
    }
}
export type AddPostActionCreatorType = ReturnType<typeof addPostActionCreator>

export const addPostActionCreator = (newPostText: string) => ({type: 'profile/ADD-POST', newPostText} as const);


export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
export const setUserProfile = (profile: any) => {
    return {
        type: 'profile/SET_USER_PROFILE',
        profile
    } as const
}

export type SetStatusActionType = ReturnType<typeof setStatus>
export const setStatus = (status: string) => {
    return {
        type: 'profile/SET_STATUS',
        status
    } as const
}

export type DeletePostActionType = ReturnType<typeof deletePostActionCreator>
export const deletePostActionCreator = (postId: number) => {
    return {
        type: 'profile/DELETE_POST',
        postId
    } as const
}

export type SetUserProfilePhotoAT = ReturnType<typeof setUserProfilePhotoAC>
export const setUserProfilePhotoAC = (photos: PhotoType) => {
    return {
        type: 'profile/SET_USER_PROFILE_PHOTO',
        photos
    } as const
}

export const getUserProfileTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export type SetUpdatedUserProfileAT = ReturnType<typeof setUpdatedUserProfileAC>
export const setUpdatedUserProfileAC = (profile: ProfileFormDataType) => {
    return {
        type: 'profile/SET_UPDATED_USER_PROFILE',
        profile
    } as const
}




export const getStatusTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}


export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const uploadPhotoTC = (photo: string | Blob) => async (dispatch: Dispatch) => {
    let response = await profileAPI.uploadPhoto(photo);
    if (response.data.resultCode === 0) {
        dispatch(setUserProfilePhotoAC(response.data.data.photos));
    }
}


export const saveProfileTC = (profile: ProfileFormDataType):AppThunk => async (dispatch) => {
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(setUpdatedUserProfileAC(profile));
    }
}


export default profileReducer;