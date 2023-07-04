import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileTC} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/redux-store";
import { RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type PathParamsType = {
    userId: string;
}

type MapStateToPropsType = {
    profile: any
}

type MapDispatchToPropsType = {
    getUserProfileTC: (userId: string) => void
}

type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

function ProfileContainer (props: PropsType) {

    useEffect(() => {
        let userId = props.match.params.userId;
        if (!userId) {
            userId = '2';
        }
        props.getUserProfileTC(userId)
    }, [])


    return (
        <Profile/>
    )

}

let mapStateToProps = (state: AppStateType):MapStateToPropsType => ({
    profile: state.profilePage.profile
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileTC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)



