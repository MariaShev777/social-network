import React, {Suspense} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {AppStateType} from "redux/store";
import {connect} from "react-redux";
import {compose} from "redux";
import {Preloader} from "components/common/preloader/Preloader";
import {initialiseApp} from "redux/appReducer";
import {UsersPage} from "components/users/UsersPage";
import {LoginPage} from "components/login/LoginPage";
import {withRouter} from "utils/withRouter";
import {Layout} from 'antd';
import {AppHeader} from "components/header/Header";
import {Navbar} from "components/navbar/Navbar";

const {Content} = Layout;

const DialoguesContainer = React.lazy(() => import('./components/dialogues/DialoguesContainer'));
const ProfileContainer = React.lazy(() => import('./components/profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'));


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

        const contentStyle: React.CSSProperties = {
            color: '#fff',
            backgroundColor: '#333232',
        };


        return (
            <>
                <Layout className={'layoutStyle'}>
                    <AppHeader/>
                    <Layout>
                        <Navbar/>
                        <Content style={contentStyle}>
                            <div className="app-wrapper-content">
                                <Suspense fallback={<Preloader/>}>
                                    <Routes>
                                        <Route path='/' element={<Navigate to="profile"/>}/>
                                        <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                                        <Route path='profile' element={<ProfileContainer/>}/>
                                        <Route path="/dialogues" element={<DialoguesContainer/>}/>
                                        <Route path="/users" element={<UsersPage/>}/>
                                        <Route path="/login" element={<LoginPage/>}/>
                                        <Route path="/chat" element={<ChatPage/>}/>
                                        {/*<Route path={'*'} element={<div>404 NOT FOUND</div>}/>*/}
                                    </Routes>
                                </Suspense>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
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
        initialised: state.app.initialised,
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initialiseApp: initialiseApp}))(App) as React.ComponentClass

