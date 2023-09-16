import React from "react";
import s from "./ProfileInfo.module.css";
import {createField, Input, TextArea} from "../../Common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";

export type ProfileFormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}

type ProfileFormProps = {
    onSubmit: (formData: ProfileFormDataType) => void
};


const ProfileDataForm: React.FC<InjectedFormProps<ProfileFormDataType, ProfileFormProps>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={s.statusAndNameBlock}>
                <div><button className={'button'}>Save</button></div>
                <div>
                    <b>Name:</b> {createField('Name', 'fullName', [], Input)}
                </div>
                <div>
                    <b>Looking for a job:</b>
                    {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
                </div>
                <div>
                    <b>My professional skills:</b>
                    {createField('My professional skills', 'lookingForAJobDescription', [], TextArea)}
                </div>
                <div>
                    <b>About me:</b>
                    {createField('About me', 'aboutMe', [], TextArea)}
                </div>


            </div>

            <div className={s.contactsBlock}>
                {/*<div><b>Contacts:</b> {Object.keys(profile.contacts).map(key => {*/}
                {/*    return <Contact*/}
                {/*        key={key}*/}
                {/*        title={key}*/}
                {/*        value={profile.contacts[key as "github" & "facebook"]}/>*/}
                {/*})}*/}
                {/*</div>*/}
            </div>
        </form>
    )
}



const ProfileDataFormReduxForm = reduxForm<ProfileFormDataType, ProfileFormProps>({
    form: 'edit-profile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm;