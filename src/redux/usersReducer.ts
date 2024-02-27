import {Dispatch} from "redux";
import {AxiosResponse} from "axios";
import {updateObjectInArray} from "../utils/validators/objectsHelpers";
import {UserType} from "../types/types";
import {AppThunk} from "./redux-store";
import {ResultCode} from "../types/enum";
import {usersAPI} from "../api/usersApi";


export type UsersActions = FollowACType
    | UnfollowACType
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleFetching>
    | ReturnType<typeof toggleFollowingProgress>

export type UsersPageType = typeof initialState

let initialState = {
    users: [] as UserType[],
    pageSize: 7,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as number[]
};

const usersReducer = (state: UsersPageType = initialState, action: UsersActions): UsersPageType => {
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

export type FollowACType = ReturnType<typeof follow>
export type UnfollowACType = ReturnType<typeof unfollow>

export const follow = (userId: number) => ({type: 'users/FOLLOW', payload: {userId}} as const)

export const unfollow = (userId: number) => ({type: 'users/UNFOLLOW', payload: {userId}} as const)

export const setUsers = (users: UserType[]) => ({type: 'users/SET-USERS', payload: {users}} as const)

export const setCurrentPage = (currentPage: number) => ({
    type: 'users/SET-CURRENT-PAGE',
    payload: {currentPage}
} as const)


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

export const getUsersThunkCreator = (currentPage: number, pageSize: number):AppThunk<UsersActions> => async (dispatch) => {
    dispatch(toggleFetching(true));
    dispatch(setCurrentPage(currentPage));

    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}


export const followUsersThunkCreator = (userId: number):AppThunk<UsersActions> => async (dispatch) => {
    let apiMethod = await usersAPI.followUsers.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, follow);
}


export const unfollowUsersThunkCreator = (userId: number):AppThunk<UsersActions> => async (dispatch) => {
    let apiMethod = await usersAPI.unfollowUsers.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, unfollow);
}


const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: (userId: number) => Promise<AxiosResponse<any, any>>,
                                  actionCreator: (userId: number) => FollowACType | UnfollowACType) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId);
    if (response.data.resultCode === ResultCode.Success) {

        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export default usersReducer;
