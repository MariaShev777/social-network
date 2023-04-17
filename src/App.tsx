import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialoguesContainer from "./components/Dialogues/DialoguesContainer";
import store from "./redux/redux-store";


export type MessageType = {
   id: number
   message: string
}
export type DialogueType = {
    id: number
    name: string
}

export type PostType = {
    id: number
    message: string
    likesCount: number
}

type FriendsType = {
    id: number
    friendName: string
    ava: string
}

export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}
export type DialoguesPageType = {
    dialogues: DialogueType[]
    messages: MessageType[]
    newMessageText: string
}

export type SidebarType = {
    friends: FriendsType[]
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialoguesPage: DialoguesPageType
    sidebar: SidebarType
}

type AppProps = {
    store: any
}


function App (props: AppProps) {
    return (
            <div className="app-wrapper">
                <Header/>
                <Navbar friendsBar={store.getState().sidebar.friends}/>
                <div className="app-wrapper-content">
                    <Route path="/profile" render={() => <Profile store={props.store}/>}/>
                    <Route path="/dialogues" render={() => <DialoguesContainer store={props.store} />}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>
                </div>
            </div>
    );
}

export default App;
