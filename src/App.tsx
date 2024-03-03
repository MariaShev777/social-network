import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import {Redirect, Route, withRouter} from "react-router-dom";
import Music from "./components/music/Music";
import News from "./components/news/News";
import Settings from "./components/settings/Settings";
import store, {AppStateType} from "./redux/redux-store";
import HeaderContainer from "./components/header/HeaderContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {Preloader} from "components/Common/preloader/Preloader";
import {initialiseApp} from "redux/appReducer";
import {withSuspense} from "hoc/withSuspense";
import {UsersPage} from "components/users/UsersPage";
import {LoginPage} from "components/login/LoginPage";

const DialoguesContainer = React.lazy(() => import('./components/Dialogues/DialoguesContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));



class App extends React.Component<AppPropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error');
}

    componentDidMount() {
        this.props.initialiseApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialised) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar friends={store.getState().sidebar.friends}/>
                <div className="app-wrapper-content">
                    <Redirect from='/' to='/profile'/>
                    <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                    <Route path="/dialogues" render={withSuspense(DialoguesContainer)}/>
                    <Route path="/users" render={() => <UsersPage />}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>
                    <Route path="/login" render={() => <LoginPage/>}/>
                    {/*<Route path={'*'} render={() => <div>404 NOT FOUND</div>}/>*/}

                </div>
            </div>
        );
    }
}

export type AppPropsType = MapStateToPropsType & MapDispatchPropsType;

type MapDispatchPropsType = {
    initialiseApp: () => void
}

type MapStateToPropsType = {
    initialised: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        initialised: state.app.initialised
    }
}

export default compose<React.ComponentType> (
    withRouter,
    connect(mapStateToProps, {initialiseApp: initialiseApp})) (App) as React.ComponentClass

