import React from 'react';
import Header, {HeaderProps, MapDispatchPropsType, MapStateToPropsType} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logOutTC} from "../../redux/authReducer";


class HeaderContainer extends React.Component<HeaderProps> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}


const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

export default connect<MapStateToPropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {logOutTC}) (HeaderContainer);