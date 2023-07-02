import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthUserDataTC} from "../../redux/authReducer";



class HeaderContainer extends React.Component<HeaderPropsType> {

    componentDidMount() {
        this.props.getAuthUserDataTC()
    }

    render() {
        return (
            <Header {...this.props} isAuth={this.props.isAuth} login={this.props.login}/>
        )
    }
}


type HeaderPropsType = MapStateToPropsType & MapDispatchPropsType;


type MapStateToPropsType = {
    isAuth: boolean
    login: string
}

type MapDispatchPropsType = {
    getAuthUserDataTC: () => void
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}


export default connect(mapStateToProps, {getAuthUserDataTC}) (HeaderContainer);