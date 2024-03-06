import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    getStatusTC,
    getUserProfileTC,
    ProfileType, saveProfileTC,
    updateStatusTC, uploadPhotoTC
} from "redux/profileReducer";
import {AppStateType} from "redux/redux-store";
import {Location} from 'history';

import {withAuthRedirect} from "hoc/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "utils/withRouter";
import { NavigateFunction, Params } from "react-router-dom";
import Profile from "components/profile/Profile";


type PathParamsType = {
    router: {
        location: Location;
        navigate: NavigateFunction;
        params: Params<'userId'>;
    }
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

type Props = PathParamsType & OwnPropsType

function ProfileContainer(props: Props) {

    // useEffect(() => {
    //     let userId: number | null = +props.match.params.userId;
    //     if (!userId) {
    //         userId = props.authorisedUserId;
    //         if (!userId) {
    //             props.history.push("/login")
    //         }
    //     }
    //     props.getUserProfileTC(userId as number)
    //     props.getStatusTC(userId as number)
    // }, [props.match.params.userId])

    const refreshProfile = () => {
        console.log(props.router)
        let userID = props.router.params.userId

        if (!userID) userID = props.authorisedUserId?.toString()
        // if (!userID) {
        //     this.props.router.location.pathname ="/login"
        // }
        //вроде все работает, проверить не показывает ли профиль после logout

        if (!userID) {
            console.error("ID should exist in URI params or in state")
        } else {
            props.getUserProfileTC(Number(userID))
            props.getStatusTC(Number(userID))
        }
    }


    useEffect(() => {
        refreshProfile()
    }, [])

    // useEffect(function (prevProps: Props) {
    //     if (prevProps.router.params.userId !== props.router.params.userId) refreshProfile()
    // }, [])



    return (
        <Profile {...props}
                 isOwner={!props.router.params.userId}
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



