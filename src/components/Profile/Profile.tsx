import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profileReducer";
import {ProfileFormDataType} from "./ProfileInfo/ProfileDataForm";



export type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    uploadPhoto: (photo: string | Blob) => void
    saveProfile: (profile: ProfileFormDataType) => Promise<any>
}


const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         uploadPhoto={props.uploadPhoto}
                         saveProfile={props.saveProfile}
            />
            <MyPostsContainer />
        </div>
    )
};

export default Profile;