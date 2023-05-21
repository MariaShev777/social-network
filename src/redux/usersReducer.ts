
export type UsersActionsType = FollowACType
    | UnfollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | SetUsersTotalCountACType;


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
    // location: {
    //     city: string
    //     country: string
    // }
}

export type UsersPageType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

let initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
};

const usersReducer = (state: UsersPageType = initialState, action: UsersActionsType): UsersPageType => {

        switch (action.type) {
            case 'FOLLOW': {
                return {
                    ...state,
                    users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: true} : u)
                }
            }
            case 'UNFOLLOW': {
                return {
                    ...state,
                    users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: false} : u)
                }
            }
            case 'SET-USERS': {
                return {
                    ...state,
                    users: [...action.payload.users]
                }
            }
            case 'SET-CURRENT-PAGE': {
                return {
                    ...state,
                    currentPage: action.payload.currentPage
                }
            }case 'SET-TOTAL-USERS-COUNT': {
                return {
                    ...state,
                    totalUsersCount: action.payload.totalCount
                }
            }
            default:
                return state
        }
    }


type FollowACType = ReturnType<typeof followAC>
type UnfollowACType = ReturnType<typeof unfollowAC>
type SetUsersACType = ReturnType<typeof setUsersAC>
type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>
type SetUsersTotalCountACType = ReturnType<typeof setUsersTotalCountAC>


export const followAC = (userId: number) => {
    return {
        type: 'FOLLOW',
        payload: {
            userId
        }
    } as const
}


export const unfollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        payload: {
            userId
        }
    } as const
}

export const setUsersAC = (users: UserType[]) => {
    return {
        type: 'SET-USERS',
        payload: {
            users
        }
    } as const
}

export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        payload: {
            currentPage
        }
    } as const
}

export const setUsersTotalCountAC = (totalCount: number) => {
    return {
        type: 'SET-TOTAL-USERS-COUNT',
        payload: {
            totalCount
        }
    } as const
}

export default usersReducer;