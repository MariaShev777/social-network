import React from "react";
import s from './formsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidator} from "utils/validators/validators";

type Props = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

const FormControl = ({meta: {touched, error}, children}: Props) => {
    const hasError = touched && error;

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}


export const TextArea = (props: WrappedFieldProps) => {
    const {input, meta, ...restProps} = props;

    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps}/>
        </FormControl>
    )
}


export const Input = (props: WrappedFieldProps) => {
    const {input, meta, ...restProps} = props;

    return (
        <FormControl {...props}>
            <input type={'text'}{...input} {...restProps}/>
        </FormControl>
    )
}


export function createField<T extends string>(placeholder: string | undefined,
                               name: T,
                               validators: FieldValidator[],
                               component: React.FC<WrappedFieldProps>,
                               props: any = {},
                               text = '') {
    return <div>
        <Field placeholder={placeholder} name={name}
               validate={validators} component={component} {...props}/> {text}
    </div>
}