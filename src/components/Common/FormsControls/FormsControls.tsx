import React, {ChangeEvent, ReactComponentElement} from "react";
import styles from './FormsControls.module.css'
import {Field} from "redux-form";

const FormControl = ({input, meta: {touched, error}, children}: any) => {
    const hasError = touched && error;

    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}


export const TextArea = (props: any) => {
    const {input, meta, ...restProps} = props;


    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps}/>
        </FormControl>
    )
}



export const Input = (props: any) => {
    const {input, meta, ...restProps} = props;

    return (
        <FormControl {...props}>
            <input {...input} {...restProps}/>
        </FormControl>
    )
}

export const createField =
    (placeholder: string | null, name: string, validators: any[],
     component: (props: any) => ReactComponentElement<any>, props: any = {}, text: string = '') => (
    <div>
        <Field placeholder={placeholder} name={name}
               validate={validators} component={component} {...props}/> {text}
    </div>
)
