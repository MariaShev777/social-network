import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "redux/usersReducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "redux/users-selectors";


const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type FriendForm = 'true' | 'false' | 'null'

type FormType = {
    term: string
    friend: FriendForm
}

type Props = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm = ({onFilterChanged}: Props) => {
    const filter = useSelector(getUsersFilter)

    const onSubmit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendForm}}
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