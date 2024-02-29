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


type PathParamsType = {
    userId: string;
}

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    getUserProfileTC: (userId: number) => void
    getStatusTC: (userId: number) => void
    updateStatusTC: (status: string) => void
    uploadPhotoTC: (photo: File) => void
    saveProfileTC: (profile: ProfileType) => Promise<any>
}

type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType

type Props = RouteComponentProps<PathParamsType> & OwnPropsType

function ProfileContainer(props: Props) {

    useEffect(() => {
        let userId: number | null = +props.match.params.userId;
        if (!userId) {
            userId = props.authorisedUserId;
            if (!userId) {
                props.history.push("/login")
            }
        }
        props.getUserProfileTC(userId as number)
        props.getStatusTC(userId as number)
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

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorisedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileTC, getStatusTC, updateStatusTC, uploadPhotoTC, saveProfileTC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)



