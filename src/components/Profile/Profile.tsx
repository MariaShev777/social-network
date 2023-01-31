import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";


const Profile = () => {
    return (
        <div className={s.content}>
            <div>
                <img
                    src="https://a-static.besthdwallpaper.com/car-extreme-sport-in-a-desert-wallpaper-2560x720-54228_72.jpg"
                    width="900px"/>
            </div>
            <div>
                <img src="https://i.redd.it/oz628d4ene331.jpg" width="100px"/>
                ava + description
            </div>
            <MyPosts/>
        </div>
    )
};

export default Profile;