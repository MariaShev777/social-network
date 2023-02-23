import React from "react";
import s from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";



type PostType = {
    id: number
    message: string
    likesCount: number
}

type ProfilePropsType = {
    state: PostType[]
    addPost: (postMessage: string) => void
}


const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts state={props.state} addPost={props.addPost} />
        </div>
    )
};

export default Profile;