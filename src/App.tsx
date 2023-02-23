import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogues from "./components/Dialogues/Dialogues";
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {addPost} from "./redux/state";


type MessageType = {
   id: number
   message: string
}
type DialogueType = {
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

type ProfilePageType = {
    posts: PostType[]
}
type DialoguesPageType = {
    dialogues: DialogueType[]
    messages: MessageType[]
}

type SidebarType = {
    friends: FriendsType[]
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialoguesPage: DialoguesPageType
    sidebar: SidebarType
}

type AppProps = {
    state: RootStateType
    addPost: (postMessage: string) => void
}


function App(props: AppProps ) {
    return (
            <div className="app-wrapper">
                <Header/>
                <Navbar friendsBar={props.state.sidebar.friends}/>
                <div className="app-wrapper-content">
                    <Route path="/profile" render={() => <Profile state={props.state.profilePage.posts} addPost={addPost}/>}/>
                    <Route path="/dialogues" render={() => <Dialogues state={props.state.dialoguesPage} />}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>

                </div>
            </div>
    );
}

export default App;
