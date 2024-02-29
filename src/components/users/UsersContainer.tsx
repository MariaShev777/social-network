import React from 'react';
import {connect} from "react-redux";
import {
    followUsersThunkCreator, getUsersThunkCreator,
    unfollowUsersThunkCreator
} from "redux/usersReducer";
import {AppStateType} from "redux/redux-store";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "redux/users-selectors";
import {UserType} from "types/types";
import {Users} from './Users';
import {Preloader} from "components/Common/preloader/Preloader";


class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsersThunkCreator(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.getUsersThunkCreator(pageNumber, pageSize);
    }

    render() {
        return <>
            <div> {this.props.isFetching ? <Preloader/> : null} </div>
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   unfollowUsersThunkCreator={this.props.unfollowUsersThunkCreator}
                   followUsersThunkCreator={this.props.followUsersThunkCreator}
            />
        </>
    }
}

type MapStatePropsType = {
    users: UserType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

type MapDispatchPropsType = {
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    unfollowUsersThunkCreator: (userId: number) => void
    followUsersThunkCreator: (userId: number) => void

}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, void, AppStateType>(mapStateToProps, {
        getUsersThunkCreator,
        unfollowUsersThunkCreator,
        followUsersThunkCreator
    })
)(UsersContainer) as React.ComponentClass
