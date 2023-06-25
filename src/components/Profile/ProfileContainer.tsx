import React, {useEffect} from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import store, {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userId: string;
}

type MapStateToPropsType = {
    profile: any
}

type MapDispatchToPropsType = {
    setUserProfile: (profile: any) => void
}

type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

function ProfileContainer (props: PropsType) {

    useEffect(() => {
        let userId = props.match.params.userId;
        if (!userId) {
            userId = '2';
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then((response) => {
                props.setUserProfile(response.data);
            })
    }, [])

        return (
            <Profile />
        )

}


let mapStateToProps = (state: AppStateType):MapStateToPropsType => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);