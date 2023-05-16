
export type UsersActionsType = followACType
    | unfollowACType
    | setUsersACType;


export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: {
        city: string
        country: string
    }
}

export type UsersPageType = {
    users: UserType[]
}

let initialState: UsersPageType = {
    users: []
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
                    users: [...state.users, ...action.payload.users]
                }
            }
            default:
                return state
        }
    }


type followACType = ReturnType<typeof followAC>
type unfollowACType = ReturnType<typeof unfollowAC>
type setUsersACType = ReturnType<typeof setUsersAC>


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

export default usersReducer;