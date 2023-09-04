import React from "react";
import { UserType} from "../../redux/usersReducer";
import {Pagination} from "../Common/Paginator/Pagination";
import {User} from "./User";



type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: number[]
    unfollowUsersThunkCreator: (userId: number) => void
    followUsersThunkCreator: (userId: number) => void
}


export const Users = (props: UsersPropsType) => {

    return <div>
        <Pagination currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                    totalItemsCount={props.totalUsersCount}
                    pageSize={props.pageSize}
        />
        <div>
            {props.users.map(u => <User key={u.id} user={u}
                                        followingInProgress={props.followingInProgress}
                                        followUsersThunkCreator={props.followUsersThunkCreator}
                                        unfollowUsersThunkCreator={props.unfollowUsersThunkCreator}/>)
            }
        </div>
    </div>
}

