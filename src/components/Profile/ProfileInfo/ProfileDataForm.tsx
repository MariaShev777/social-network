import React from "react";
import s from "./ProfileInfo.module.css";
import style from '../../Common/FormsControls/FormsControls.module.css'
import {createField, Input, TextArea} from "../../Common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ContactsType, ProfileType} from "../../../redux/profileReducer";

export type ProfileFormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: ContactsType
}


export type ProfileFormDataContactsType = {
    profile: ProfileType
}


const ProfileDataForm: React.FC<InjectedFormProps<ProfileFormDataType,ProfileFormDataContactsType>> = (props: InjectedFormProps<ProfileFormDataType,ProfileFormDataContactsType>) => {
    const {handleSubmit, initialValues, error} = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className={s.statusAndNameBlock}>
                <div><button className={'button'}>Save</button></div>
                {error && <div className={style.formSummaryError}> {error} </div>}
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
                <div><b>Contacts:</b> {Object.keys(initialValues.contacts ?? {}).map(key => {
                    return <div>
                        <b>{key}:</b> {createField(key, 'contacts.' + key, [], Input)}
                    </div>
                })}
                </div>
            </div>
        </form>
    )
}



const ProfileDataFormReduxForm = reduxForm<ProfileFormDataType, ProfileFormDataContactsType>({
    form: 'edit-profile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm;