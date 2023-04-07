import React from "react";
import s from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../App";



type ProfilePropsType = {
    posts: ProfilePageType
    dispatch: (action: any) => void
}


const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts.posts}
                     newPostText={props.posts.newPostText}
                     dispatch={props.dispatch}/>
        </div>
    )
};

export default Profile;