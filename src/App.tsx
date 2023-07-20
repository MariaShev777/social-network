import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialoguesContainer from "./components/Dialogues/DialoguesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import store from "./redux/redux-store";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {getAuthUserDataTC} from "./redux/authReducer";
import {compose} from "redux";
import {initialiseAppTC} from "./redux/appReducer";


class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.getAuthUserDataTC()
    }


    render() {
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar friends={store.getState().sidebar.friends}/>
                <div className="app-wrapper-content">
                    <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                    <Route path="/dialogues" render={() => <DialoguesContainer/>}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>

                    <Route path="/users" render={() => <UsersContainer/>}/>

                    <Route path="/login" render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

export type AppPropsType = MapDispatchPropsType;

type MapDispatchPropsType = {
    getAuthUserDataTC: () => void
}


export default compose (
    withRouter,
    connect(null, {initialiseAppTC})) (App);
