import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserDataAC} from "../../redux/authReducer";
import {usersAPI} from "../../api/api";



class HeaderContainer extends React.Component<HeaderPropsType> {

    componentDidMount() {
        // this.props.toggleFetching(true)
        usersAPI.logIn()
            .then(res => {
                if (res.data.resultCode === 0) {
                    let {id, email, login} = res.data.data
                    // this.props.toggleFetching(false);
                    this.props.setAuthUserDataAC(id, email, login);
                }
            })
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
    setAuthUserDataAC: (id: number, email: string, login: string) => void
    // toggleFetching: (isFetching: boolean) => void
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}


export default connect(mapStateToProps, {setAuthUserDataAC}) (HeaderContainer);