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
import {useNavigate, useSearchParams } from 'react-router-dom';


type QueryParams = { term?: string; page?: string; friend?: string }

export const Users = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    useEffect(() => {
        const parsed = Object.fromEntries(searchParams)

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = +parsed.page
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break;
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break;
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break;
        }

        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParams = {}

        const term = filter.term
        const friend = filter.friend
        // `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`

        if (!!term) query.term = term
        if (friend !== null) query.friend = String(friend)
        if (currentPage !== 1) query.page = String(currentPage)

        // const queryToString = new URLSearchParams(query)
        setSearchParams(query)

        // navigate('/users')
        // setSearchParams(queryToString.toString())
    }, [filter, currentPage])


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
