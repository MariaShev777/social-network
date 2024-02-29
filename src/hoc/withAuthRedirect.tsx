import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {AppStateType} from "redux/redux-store";
import {connect} from "react-redux";

type Props = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType): Props => ({
    isAuth: state.auth.isAuth
})


export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: Props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={"/login"}/>;

        return <Component {...restProps as T} />
    }

    let ConnectedAuthRedirectComponent = connect<Props, {}, T, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent)

    return ConnectedAuthRedirectComponent;
}