import React, {ChangeEvent} from "react";
import s from './ProfileInfo.module.css';
import {Preloader} from "../../Common/Preloader/Preloader";
import {PhotoType, ProfileType} from "../../../redux/profileReducer";
import userPhoto from '../../../assets/images/noname.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

export type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: PhotoType) => void
}



const ProfileInfo:React.FC<ProfileInfoType> = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    if (!profile) {
        return <Preloader/>
    }

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={s.wallpaper}>
                <img
                    src="https://thumbs.dreamstime.com/b/cat-seamless-pattern-kitten-vector-calico-neko-breed-yarn-ball-character-cartoon-pet-tile-background-repeat-wallpaper-animal-242401729.jpg"
                    width="900px" height="300px"/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto}/>
                {isOwner && <input type={'file'} onChange={mainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>

    )
}

export default ProfileInfo;