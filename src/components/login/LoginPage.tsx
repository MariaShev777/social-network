import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/forms-controls/FormsControls";
import {required} from "utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "redux/authReducer";
import {Navigate} from "react-router-dom";
import {AppStateType} from "redux/store";
import s from 'components/common/forms-controls/formsControls.module.css'
import styles from './login.module.css'
import {Button} from "antd";

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

const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormPropsType> & LoginFormPropsType> = ({
                                                                                                           handleSubmit,
                                                                                                           error,
                                                                                                           captchaUrl
                                                                                                       }) => {
    return (
        <form onSubmit={handleSubmit} className={s.loginForm}>
            {createField<FormDataKeys>("Email", "email", [required], Input)}
            {createField<FormDataKeys>("Password", "password", [required], Input, {type: "password"})}
            {createField<FormDataKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField<FormDataKeys>("Enter symbols from image", "captcha", [required], Input, {})}

            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div className={s.logInButton}>
                <Button type="primary" style={{backgroundColor: '#00ff18', color: '#202020'}}>Log In</Button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>({
    form: 'login'
})(LoginForm)



export const LoginPage = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: FormDataType) => {
        dispatch(logIn(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return <div className={styles.loginPage}>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}
