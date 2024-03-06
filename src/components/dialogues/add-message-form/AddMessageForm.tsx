import {maxLengthCreator, required} from "utils/validators/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, TextArea} from "components/common/forms-controls/FormsControls";
import {AddFormData} from "components/dialogues/Dialogues";



type AddFormDataKeys = keyof AddFormData

type Props = {}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: React.FC<InjectedFormProps<AddFormData, Props> & Props> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddFormDataKeys>("Enter your message", "newMessage", [required, maxLength50], TextArea)}
            </div>
            <div>
                <button className={'button'}>SEND</button>
            </div>
        </form>
    )
}

export default reduxForm<AddFormData, Props>({form: 'dialogueAddMessageForm'})(AddMessageForm)