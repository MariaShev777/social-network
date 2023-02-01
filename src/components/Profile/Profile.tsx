import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";


const Profile = () => {
    return (
        <div>
            <div className={s.wallpaper}>
                <img
                    src="https://thumbs.dreamstime.com/b/cat-seamless-pattern-kitten-vector-calico-neko-breed-yarn-ball-character-cartoon-pet-tile-background-repeat-wallpaper-animal-242401729.jpg"
                    width="800px" height='300px'/>
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