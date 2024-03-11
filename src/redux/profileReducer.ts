import {AppThunk} from "redux/store";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType} from "types/types";
import {ResultCode} from "types/enum";
import {profileAPI} from "api/profileApi";

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string,
    youtube: string
    github: string
    mainLink: string
}

export type ProfileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type ProfilePageType = {
    posts: PostType[]
    profile: ProfileType | null
    status: string
}

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 15},
        {id: 2, message: "It's my first post", likesCount: 21},
        {id: 3, message: "WoW", likesCount: 25},
        {id: 4, message: "See ya", likesCount: 29}
    ],
    profile: null,
    status: ''
};


export type ProfilePageActions =
    | AddPostActionCreatorType
    | SetUserProfileActionType
    | SetStatusActionType
    | DeletePostActionType
    | SetUserProfilePhotoAT;

const profileReducer = (state = initialState, action: ProfilePageActions): ProfilePageType => {
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
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state
    }
}


export type AddPostActionCreatorType = ReturnType<typeof addPostActionCreator>
export const addPostActionCreator = (newPostText: string) => ({type: 'profile/ADD-POST', newPostText} as const)


export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
export const setUserProfile = (profile: ProfileType) => ({type: 'profile/SET_USER_PROFILE', profile} as const)


export type SetStatusActionType = ReturnType<typeof setStatus>
export const setStatus = (status: string) => ({type: 'profile/SET_STATUS', status} as const)


export type DeletePostActionType = ReturnType<typeof deletePostActionCreator>
export const deletePostActionCreator = (postId: number) => ({type: 'profile/DELETE_POST', postId} as const)


export type SetUserProfilePhotoAT = ReturnType<typeof setUserProfilePhotoAC>
export const setUserProfilePhotoAC = (photos: PhotosType) => ({type: 'profile/SET_USER_PROFILE_PHOTO', photos} as const)


export const getUserProfileTC = (userId: number): AppThunk<ProfilePageActions> => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
}

export const getStatusTC = (userId: number): AppThunk<ProfilePageActions> => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
}

export const updateStatusTC = (status: string): AppThunk<ProfilePageActions> => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === ResultCode.Success) {
            dispatch(setStatus(status));
        }
    } catch (error) {
    }
}

export const uploadPhotoTC = (photo: File): AppThunk<ProfilePageActions> => async (dispatch) => {
    let data = await profileAPI.uploadPhoto(photo);
    if (data.resultCode === ResultCode.Success) {
        dispatch(setUserProfilePhotoAC(data.data.photos));
    }
}

export const saveProfileTC = (profile: ProfileType): AppThunk<ProfilePageActions | FormAction> => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === ResultCode.Success) {
        if (userId !== null) {
            dispatch(getUserProfileTC(userId));
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        // dispatch(stopSubmit('edit-profile', {"contacts": {"facebook": response.data.messages[0]} }))
        return Promise.reject(data.messages[0]);
    }
}


export default profileReducer;