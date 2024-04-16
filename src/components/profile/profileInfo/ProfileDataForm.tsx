import React from "react";
import s from './profileInfo.module.css'
import style from 'components/common/forms-controls/formsControls.module.css'
import {createField, Input, TextArea} from "../../common/forms-controls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "redux/profileReducer";


export type ProfileFormDataContacts = {
    profile: ProfileType
}

type ProfileFormDataKeys = keyof ProfileType

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileFormDataContacts> & ProfileFormDataContacts> = ({handleSubmit, profile, error}) => {

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
                    {createField<ProfileFormDataKeys>('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
                </div>
                <div>
                    <b>My professional skills:</b>
                    {createField<ProfileFormDataKeys>('My professional skills', 'lookingForAJobDescription', [], TextArea)}
                </div>
                <div>
                    <b>About me:</b>
                    {createField<ProfileFormDataKeys>('About me', 'aboutMe', [], TextArea)}
                </div>
            </div>

            <div className={s.contactsBlock}>
                <div><b>Contacts:</b> {Object.keys(profile.contacts ?? {}).map(key => {
                    return <div>
                        <b>{key}:</b> {createField(key, 'contacts.' + key, [], Input)}

                    </div>
                })}
                </div>
            </div>
        </form>
    )
}



const ProfileDataFormReduxForm = reduxForm<ProfileType, ProfileFormDataContacts>({
    form: 'edit-profile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm;