import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "redux/usersReducer";

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

type Props = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm = ({onFilterChanged}: Props) => {

    const onSubmit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
            initialValues={{term: '', friend: 'null'}}
            validate={usersSearchFormValidate}
            onSubmit={onSubmit}>
            {({isSubmitting}) => (
                <Form>
                    <Field type='text' name='term'/>
                    <Field name='friend' as='select'>
                        <option value='null'>All</option>
                        <option value='true'>Friends only</option>
                        <option value='false'>Others</option>
                    </Field>
                    <button type='submit' disabled={isSubmitting}>Search</button>
                </Form>
            )}
        </Formik>
    </div>
}