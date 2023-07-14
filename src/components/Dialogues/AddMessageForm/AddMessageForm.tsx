import {maxLengthCreator, required} from "../../../utils/validators/validators";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../../Common/FormsControls/FormsControls";

export type AddFormDataType = {
    newMessage: string
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: React.FC<InjectedFormProps<AddFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} validate={[required, maxLength50]} name='newMessage' placeholder="Enter a message"/>
            </div>
            <div>
                <button>SEND</button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<AddFormDataType>({form: 'dialogueAddMessageForm'})(AddMessageForm)