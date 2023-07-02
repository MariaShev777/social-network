import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileTC} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userId: string;
}

type MapStateToPropsType = {
    profile: any
    isAuth: boolean
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

    if (!props.isAuth) return <Redirect to={"/login"}/>;

    return (
        <Profile/>
    )

}


let mapStateToProps = (state: AppStateType):MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {getUserProfileTC}) (WithUrlDataContainerComponent);