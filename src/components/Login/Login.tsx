import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";



type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props ) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={'login'}
                       validate={[required]} component={Input}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={'password'}
                       validate={[required]} component={Input}/>
            </div>
            <div>
                <Field type={"checkbox"} name={'rememberMe'} component={Input}/> remember me
            </div>
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)


export const Login = () => {

    const onSubmit = (formData: FormDataType) => {
        // dispatch(logInTC(formData))
        console.log(formData)
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}