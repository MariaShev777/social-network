import {required} from "../../../../utils/validators/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "../MyPosts.module.css";
import {createField, TextArea} from "../../../Common/formsControls/FormsControls";

export type AddPostFormData = {
    newPostText: string
}

type AddPostFormDataKeys = keyof AddPostFormData

const AddPostForm: React.FC<InjectedFormProps<AddPostFormData>> = (props) => {
    return (
        <div className={s.addPostBlock}>
            <form onSubmit={props.handleSubmit}>
                <div className={"generalInput"}>
                    {createField<AddPostFormDataKeys>("Post your message", "newPostText", [required], TextArea)}
                </div>
                <div>
                    <button className={"button"}>Add post</button>
                </div>
            </form>
        </div>
    )
}

export default reduxForm<AddPostFormData>({form: "profileAddNewPostForm"})(AddPostForm)