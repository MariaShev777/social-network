import React from 'react';
import {useSelector} from "react-redux";
import {getIsFetching} from "redux/users-selectors";
import {Users} from './Users';
import {Preloader} from "components/Common/preloader/Preloader";

export const UsersPage = () => {
    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}

