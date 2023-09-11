import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {AxiosResponse} from "axios";
import {updateObjectInArray} from "../utils/validators/objectsHelpers";

export type UsersActionsType = FollowACType
    | UnfollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | SetUsersTotalCountACType
    | ToggleFetchingACType
    | ToggleFollowingProgressACType


export type UserType = {
    id: number
    photos: {
        small: string,
        large: string
    }
    followed: boolean
    name: string
    status: string
    uniqueUrlName: string
    contacts: {
        github: string
    }
}

export type UsersPageType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

let initialState: UsersPageType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};

const usersReducer = (state: UsersPageType = initialState, action: UsersActionsType): UsersPageType => {
        switch (action.type) {
            case 'users/FOLLOW': {
                return {
                    ...state,
                    // users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: true} : u)
                    users: updateObjectInArray(state.users, action.payload.userId, 'id', {followed: true})
                }
            }
            case 'users/UNFOLLOW': {
                return {
                    ...state,
                    // users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: false} : u)
                    users: updateObjectInArray(state.users, action.payload.userId, 'id', {followed: false})
                }
            }
            case 'users/SET-USERS': {
                return {
                    ...state,
                    users: [...action.payload.users]
                }
            }
            case 'users/SET-CURRENT-PAGE': {
                return {
                    ...state,
                    currentPage: action.payload.currentPage
                }
            }
            case 'users/SET-TOTAL-USERS-COUNT': {
                return {
                    ...state,
                    totalUsersCount: action.payload.totalCount
                }
            }
            case 'users/TOGGLE-FETCHING': {
                return {
                    ...state,
                    isFetching: action.payload.isFetching
                }
            }
            case 'users/TOGGLE-IS-FOLLOWING-PROGRESS': {
                return {
                    ...state,
                    followingInProgress: action.payload.isFetching
                        ? [...state.followingInProgress, action.payload.userId]
                        : state.followingInProgress.filter(id => id !== action.payload.userId)
                }
            }
            default:
                return state
        }
    }


type FollowACType = ReturnType<typeof follow>
type UnfollowACType = ReturnType<typeof unfollow>
type SetUsersACType = ReturnType<typeof setUsers>
type SetCurrentPageACType = ReturnType<typeof setCurrentPage>
type SetUsersTotalCountACType = ReturnType<typeof setTotalUsersCount>
type ToggleFetchingACType = ReturnType<typeof toggleFetching>
type ToggleFollowingProgressACType = ReturnType<typeof toggleFollowingProgress>



export const follow = (userId: number) => {
    return {
        type: 'users/FOLLOW',
        payload: {
            userId
        }
    } as const
}

export const unfollow = (userId: number) => {
    return {
        type: 'users/UNFOLLOW',
        payload: {
            userId
        }
    } as const
}

export const setUsers = (users: UserType[]) => {
    return {
        type: 'users/SET-USERS',
        payload: {
            users
        }
    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'users/SET-CURRENT-PAGE',
        payload: {
            currentPage
        }
    } as const
}

export const setTotalUsersCount = (totalCount: number) => {
    return {
        type: 'users/SET-TOTAL-USERS-COUNT',
        payload: {
            totalCount
        }
    } as const
}

export const toggleFetching = (isFetching: boolean) => {
    return {
        type: 'users/TOGGLE-FETCHING',
        payload: {
            isFetching
        }
    } as const
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
    return {
        type: 'users/TOGGLE-IS-FOLLOWING-PROGRESS',
        payload: {
            isFetching,
            userId
        }
    } as const
}

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleFetching(true));
    dispatch(setCurrentPage(currentPage));

    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}


const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: (userId: number) => Promise<AxiosResponse<any, any>>,
                                  actionCreator: (userId: number) => FollowACType | UnfollowACType) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {

        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}


export const followUsersThunkCreator = (userId: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.followUsers.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, follow);
}


export const unfollowUsersThunkCreator = (userId: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.unfollowUsers.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, unfollow);
}



export default usersReducer;
