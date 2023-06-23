
export type UsersActionsType = FollowACType
    | UnfollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | SetUsersTotalCountACType
    | ToggleFetchingACType;


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
    isFetching: boolean
}

let initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
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
            }
            case 'SET-TOTAL-USERS-COUNT': {
                return {
                    ...state,
                    totalUsersCount: action.payload.totalCount
                }
            }
            case 'TOGGLE-FETCHING': {
                return {
                    ...state,
                    isFetching: action.payload.isFetching
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



export const follow = (userId: number) => {
    return {
        type: 'FOLLOW',
        payload: {
            userId
        }
    } as const
}


export const unfollow = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        payload: {
            userId
        }
    } as const
}

export const setUsers = (users: UserType[]) => {
    return {
        type: 'SET-USERS',
        payload: {
            users
        }
    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        payload: {
            currentPage
        }
    } as const
}

export const setTotalUsersCount = (totalCount: number) => {
    return {
        type: 'SET-TOTAL-USERS-COUNT',
        payload: {
            totalCount
        }
    } as const
}

export const toggleFetching = (isFetching: boolean) => {
    return {
        type: 'TOGGLE-FETCHING',
        payload: {
            isFetching
        }
    } as const
}

export default usersReducer;