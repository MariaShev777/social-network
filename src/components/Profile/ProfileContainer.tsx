import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatusTC,
    getUserProfileTC,
    ProfileType, saveProfileTC,
    updateStatusTC, uploadPhotoTC
} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileFormDataType} from "./ProfileInfo/ProfileDataForm";

type PathParamsType = {
    userId: string;
}

type MapStateToPropsType = {
    profile: ProfileType
    status: string
    authorisedUserId: number
    isAuth: boolean

}

type MapDispatchToPropsType = {
    getUserProfileTC: (userId: number) => void
    getStatusTC: (userId: number) => void
    updateStatusTC: (status: string) => void
    uploadPhotoTC: (photo: string | Blob) => void
    saveProfileTC: (profile: ProfileFormDataType) => Promise<any>
}

type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

function ProfileContainer(props: PropsType) {

    useEffect(() => {
        let userId = +props.match.params.userId;
        if (!userId) {
            userId = props.authorisedUserId;
            if (!userId) {
                props.history.push("/login")
            }
        }
        props.getUserProfileTC(userId)
        props.getStatusTC(userId)
    }, [props.match.params.userId])


    return (
        <Profile {...props}
                 isOwner={!props.match.params.userId}
                 profile={props.profile}
                 status={props.status}
                 updateStatus={props.updateStatusTC}
                 uploadPhoto={props.uploadPhotoTC}
                 saveProfile={props.saveProfileTC}/>
    )

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorisedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileTC, getStatusTC, updateStatusTC, uploadPhotoTC, saveProfileTC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer) as React.ComponentClass



