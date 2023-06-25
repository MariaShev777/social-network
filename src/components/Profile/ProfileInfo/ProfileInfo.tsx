import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from "../../Common/Preloader/Preloader";
import store from "../../../redux/redux-store";

//
// export type ProfileInfoType = {
//     profile: {  }
// }

const ProfileInfo = () => {

    if (!store.getState().profilePage.profile) {
        return <Preloader />
    }


    return (
        <div>
            <div className={s.wallpaper}>
                <img
                    src="https://thumbs.dreamstime.com/b/cat-seamless-pattern-kitten-vector-calico-neko-breed-yarn-ball-character-cartoon-pet-tile-background-repeat-wallpaper-animal-242401729.jpg"
                    width="900px" height="300px"/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={store.getState().profilePage.profile.photos.large} />
                <img src="https://i.redd.it/oz628d4ene331.jpg" width="100px"/>
                <div><i>Hi, kitties! It's Nacho here ;)</i></div>
            </div>
        </div>

    )
};

export default ProfileInfo;