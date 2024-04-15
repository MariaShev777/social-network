import React from "react";
import {ProfileType} from "redux/profileReducer";
import MyPostsContainer from "components/profile/my-posts/MyPostsContainer";
import ProfileInfo from "components/profile/profileInfo/ProfileInfo";
import {Button} from "antd";


type Props = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    uploadPhoto: (photo: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}


const Profile = (props: Props) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         uploadPhoto={props.uploadPhoto}
                         saveProfile={props.saveProfile}
            />
            <MyPostsContainer/>
        </div>
    )
};

export default Profile;