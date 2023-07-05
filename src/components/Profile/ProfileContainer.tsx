import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatusTC, getUserProfileTC, ProfileType, updateStatusTC} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/redux-store";
import { RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type PathParamsType = {
    userId: string;
}

type MapStateToPropsType = {
    profile: ProfileType
    status: string
}

type MapDispatchToPropsType = {
    getUserProfileTC: (userId: string) => void
    getStatusTC: (userId: string) => void
    updateStatusTC: (status: string) => void
}

type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

function ProfileContainer (props: PropsType) {

    useEffect(() => {
        let userId = props.match.params.userId;
        if (!userId) {
            userId = '29111';
        }
        props.getUserProfileTC(userId)
        props.getStatusTC(userId)
    }, [])


    return (
        <Profile {...props} profile={props.profile} status={props.status} updateStatus={props.updateStatusTC}/>
    )

}

let mapStateToProps = (state: AppStateType):MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileTC, getStatusTC, updateStatusTC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)



