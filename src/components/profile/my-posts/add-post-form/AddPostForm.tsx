import {required} from "utils/validators/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "components/profile/my-posts/myPosts.module.css";
import {createField, TextArea} from "../../../common/forms-controls/FormsControls";
import {Button} from "antd";

export type AddPostFormData = {
    newPostText: string
}

type AddPostFormDataKeys = keyof AddPostFormData

const AddPostForm: React.FC<InjectedFormProps<AddPostFormData>> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit} className={s.addPostBlock}>
                <div className={"generalInput"}>
                    {createField<AddPostFormDataKeys>("Type your message", "newPostText", [required], TextArea)}
                </div>
                <div>
                    <Button style={{backgroundColor: '#00ff18', color: '#202020'}} htmlType="submit">Add post</Button>
                </div>
            </form>
        </div>
    )
}

export default reduxForm<AddPostFormData>({form: "profileAddNewPostForm"})(AddPostForm)