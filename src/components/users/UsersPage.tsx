import React from 'react';
import {useSelector} from "react-redux";
import {Users} from './Users';
import {Preloader} from "components/common/preloader/Preloader";
import {getIsFetching} from "redux/users-selectors";

export const UsersPage = () => {
    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}

