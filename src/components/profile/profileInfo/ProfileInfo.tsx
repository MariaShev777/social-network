import React, {ChangeEvent, useState} from "react";
import s from './profileInfo.module.css'
import {ProfileType} from "redux/profileReducer";
import userPhoto from "assets/images/noname.png"
import ProfileDataForm from "./ProfileDataForm";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import {Preloader} from "components/common/preloader/Preloader";
import {Button} from "antd";
import {EditPhoto} from "assets/icons/EditPhoto";
import {GithubOutlined} from "@ant-design/icons";

type ProfileInfo = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    uploadPhoto: (photo: File) => void
    saveProfile: (formData: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<ProfileInfo> = ({profile, status, updateStatus, isOwner, uploadPhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            uploadPhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div className={s.profileHeader}>
            <div className={s.profilePhoto}>
                <img src={profile.photos.large || userPhoto} alt={'photo'}/>
            </div>

            <div className={s.profileInfo}>
                <div className={s.nameAndStatus}>
                    <div className={s.userName}>
                        {profile.fullName}
                    </div>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>

                <div className={s.about}>
                    {isOwner &&
                        <label className={s.edit}>
                            <input type={"file"} onChange={onMainPhotoSelected}/>
                            <EditPhoto/>
                        </label>
                    }
                    {editMode
                        ? <ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmit}/>
                        : <ProfileData profile={profile} isOwner={isOwner} triggerEditMode={() => setEditMode(true)}/>}
                </div>
            </div>
        </div>
    )
}


type ProfileData = {
    profile: ProfileType
    isOwner: boolean
    triggerEditMode: () => void
}

const ProfileData = ({profile, isOwner, triggerEditMode}: ProfileData) => {
    return (
        <>
            <div className={s.userInfo}>
                <div>
                    <b>About me:</b>
                    <div>{profile.aboutMe}</div>
                </div>
                <div>
                    <b>Looking for a job:</b>
                    <div>{profile.lookingForAJob ? "yes" : "no"}</div>
                </div>
                <div>
                    <b>Stack:</b>
                    <div>{profile.lookingForAJobDescription}</div>
                </div>
            </div>

            <div className={s.link}>
                {isOwner && <div className={s.edit}>
                    <Button onClick={triggerEditMode}>Edit</Button>
                </div>}
                <Button shape="circle" icon={<GithubOutlined/>} href={profile.contacts['github']}
                        style={{backgroundColor: 'none', border: 'none'}}> </Button>
            </div>
        </>
    )
}


export default ProfileInfo;