import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {PhotoType, ProfileType} from "../../redux/profileReducer";



export type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: PhotoType) => void
}


const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         savePhoto={props.savePhoto}/>
            <MyPostsContainer />
        </div>
    )
};

export default Profile;