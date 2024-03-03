import React, {useEffect} from "react";
import {User} from './User';
import {Pagination} from "components/Common/paginator/Pagination";
import {UsersSearchForm} from "components/users/UsersSearchForm";
import {FilterType, followUsersThunkCreator, getUsersThunkCreator, unfollowUsersThunkCreator} from "redux/usersReducer";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "redux/users-selectors";
import {useDispatch, useSelector} from "react-redux";


export const Users = () => {
    const dispatch = useDispatch()

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
    }, [])


    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    }

    const follow = (userId: number) => {
        dispatch(followUsersThunkCreator(userId))
    }

    const unfollow = (userId: number) => {
        dispatch(unfollowUsersThunkCreator(userId))
    }

    return <div>
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Pagination currentPage={currentPage} onPageChanged={onPageChanged}
                        totalItemsCount={totalUsersCount}
                        pageSize={pageSize}
            />
            {users.map(u => <User key={u.id} user={u}
                                  followingInProgress={followingInProgress}
                                  followUsersThunkCreator={follow}
                                  unfollowUsersThunkCreator={unfollow}/>)
            }
        </div>
    </div>
}
