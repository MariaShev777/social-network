import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../Common/formsControls/FormsControls";
import {required} from "utils/validators/validators";
import {connect} from "react-redux";
import {logIn} from "redux/authReducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "redux/redux-store";
import s from 'components/Common/formsControls/formsControls.module.css'

export type FormDataKeys = keyof FormDataType
export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormPropsType = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormPropsType> & LoginFormPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<FormDataKeys>("Email", "email", [required], Input)}
            {createField<FormDataKeys>("Password", "password", [required], Input, {type: "password"})}
            {createField<FormDataKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField<FormDataKeys>("Enter symbols from image", "captcha", [required], Input, {}) }

            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>({
    form: 'login'
})(LoginForm)




type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

let mapStateToProps = (state: AppStateType):MapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

type Props = MapStateToPropsType & MapDispatchToPropsType

const Login = (props: Props) => {

    const onSubmit = (formData: FormDataType) => {
        props.logIn(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }


    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

export default connect(mapStateToProps, {logIn})(Login);