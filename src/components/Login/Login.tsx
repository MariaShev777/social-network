import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {logInTC} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import styles from '../Common/FormsControls/FormsControls.module.css'


export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, {type: "password"})}
            {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)



type MapStateToPropsType = {
    isAuth: boolean
}

type MapDispatchToPropsType = {
    logInTC: (email: string, password: string, rememberMe: boolean) => void
}

let mapStateToProps = (state: AppStateType):MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const Login = (props: PropsType) => {

    const onSubmit = (formData: FormDataType) => {
        props.logInTC(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }


    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

export default connect(mapStateToProps, {logInTC})(Login);