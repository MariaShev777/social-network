import React, {Suspense} from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import {Link, Navigate, NavLink, Route, Routes} from "react-router-dom";
import Music from "./components/music/Music";
import News from "./components/news/News";
import Settings from "./components/settings/Settings";
import store, {AppStateType} from "redux/store";
import {connect} from "react-redux";
import {compose} from "redux";
import {Preloader} from "components/common/preloader/Preloader";
import {initialiseApp} from "redux/appReducer";
import {UsersPage} from "components/users/UsersPage";
import {LoginPage} from "components/login/LoginPage";
import {withRouter} from "utils/withRouter";
import {Layout, Menu, Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import s from "components/navbar/navbar.module.css";
import {AppHeader} from "components/header/Header";

const {Header, Footer, Sider, Content} = Layout;

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
        };


        return (
            <>
                {/*<div className="app-wrapper">*/}

                {/*</div>*/}


                <Layout className={'layoutStyle'}>
                    <AppHeader/>
                    <Layout>
                        <Sider width="25%" className={'siderStyle'} style={{backgroundColor: '#333232'}}>
                            <Menu className={'menuStyle'}
                                  theme="dark"
                                  mode="inline"
                                  items={[
                                      {
                                          key: '1',
                                          label: <Link to="/profile">Profile</Link>,

                                      },
                                      {
                                          key: '2',
                                          label: <Link to="/dialogues">Messages</Link>,
                                      },
                                      {
                                          key: '3',
                                          label: <Link to="/users">Users</Link>,
                                      },
                                      {
                                          key: '4',
                                          label: <Link to="/chat">Chat</Link>,
                                      },
                                  ]}
                            />
                            <div className={'friendsBlock'}>
                                FRIENDS
                                <div >
                                    {/*{props.friends.map(el => {*/}

                                        <div className={''}>
                                            <img src={''}/>
                                            <span>{}</span>
                                        </div>

                                {/*})}*/}
                                </div>
                            </div>
                        </Sider>
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
                    {/*<Footer style={footerStyle}>Footer</Footer>*/}
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
        initialised: state.app.initialised
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initialiseApp: initialiseApp}))(App) as React.ComponentClass

