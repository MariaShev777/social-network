import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from "../../Common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profileReducer";
import userPhoto from '../../../assets/images/noname.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

export type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}



const ProfileInfo:React.FC<ProfileInfoType> = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }


    return (
        <div>
            <div className={s.wallpaper}>
                <img
                    src="https://thumbs.dreamstime.com/b/cat-seamless-pattern-kitten-vector-calico-neko-breed-yarn-ball-character-cartoon-pet-tile-background-repeat-wallpaper-animal-242401729.jpg"
                    width="900px" height="300px"/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} width='170px'/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>

    )
}

export default ProfileInfo;