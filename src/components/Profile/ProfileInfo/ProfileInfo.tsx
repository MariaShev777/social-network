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
    uploadPhoto: (photo: string | Blob) => void
}



const ProfileInfo:React.FC<ProfileInfoType> = ({profile, status, updateStatus, isOwner, uploadPhoto}) => {
    if (!profile) {
        return <Preloader/>
    }

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            uploadPhoto(e.target.files[0])
        }
    }

    return (
            <div className={s.descriptionBlock}>
                <div className={s.avaAndButtonBlock}>
                    <img src={profile.photos.large || userPhoto}/>
                    {isOwner &&
                        <label className={`button` + ' ' + s.button}>
                            <input type={'file'} onChange={mainPhotoSelected}/>
                            Upload a photo
                        </label>
                    }
                </div>
                    <div className={s.statusAndNameBlock}>
                        Status: <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                        <span>Name: {profile.fullName}</span>
                    </div>

                </div>
    )
}

export default ProfileInfo;