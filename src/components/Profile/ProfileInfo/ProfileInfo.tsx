import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../Common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profileReducer";
import userPhoto from "../../../assets/images/noname.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm, {ProfileFormDataType} from "./ProfileDataForm";


export type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    uploadPhoto: (photo: string | Blob) => void
    saveProfile: (formData: ProfileFormDataType) => Promise<any>
}


const ProfileInfo: React.FC<ProfileInfoType> = ({profile, status, updateStatus, isOwner, uploadPhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState<boolean>(false);

    if (!profile) {
        return <Preloader/>
    }

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            uploadPhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileFormDataType) => {
       saveProfile(formData).then(() => {
               setEditMode(false);
           })
    }

    return (
        <div className={s.descriptionBlock}>
            <div className={s.avaAndButtonBlock}>
                <img src={profile.photos.large || userPhoto}/>
                {isOwner &&
                    <label className={`button` + " " + s.button}>
                        <input type={"file"} onChange={mainPhotoSelected}/>
                        Upload a photo
                    </label>
                }

            </div>
            <div className={s.statusAndNameBlock}>
                {editMode
                    ? <ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmit} />
                    : <ProfileData profile={profile} isOwner={isOwner} triggerEditMode={() => setEditMode(true)}/>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>

    )
}

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    triggerEditMode: () => void
}

const ProfileData = ({profile, isOwner, triggerEditMode}: ProfileDataType) => {
    return (
        <>
            {isOwner && <div><button onClick={triggerEditMode}>Edit</button></div>}
            <div className={s.statusAndNameBlock}>
                <div><b>Name:</b> {profile.fullName}</div>
                <div>
                    <b>About me:</b> {profile.aboutMe}
                </div>
                <div>
                    <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
                </div>
                <div>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>

            </div>

            <div className={s.contactsBlock}>
                <div><b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <Contact
                        key={key}
                        title={key}
                        value={profile.contacts[key as "github" & "facebook"]}/>
                })}
                </div>
            </div>
        </>
    )
}



type ContactPropsType = {
    title: string
    value: string
}

export const Contact = ({title, value}: ContactPropsType) => {
    return <div style={{fontWeight: '400'}}>
        <b>{title}:</b> {value}
    </div>
}

export default ProfileInfo;