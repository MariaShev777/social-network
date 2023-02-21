import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogues from "./components/Dialogues/Dialogues";
import {BrowserRouter, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";


type MessageType = {
   id: number
   message: string
}
type DialogueType = {
    id: number
    name: string
}

type PostType = {
    id: number
    message: string
    likesCount: number
}

type ProfilePageType = {
    posts: PostType[]
}
type DialoguesPageType = {
    dialogues: DialogueType[]
    messages: MessageType[]
}

type RootStateType = {
    profilePage: ProfilePageType
    dialoguesPage: DialoguesPageType
}

type AppProps = {
    state: RootStateType
}


function App(props: AppProps ) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/profile" render={() => <Profile state={props.state.profilePage.posts}/>}/>
                    <Route path="/dialogues" render={() => <Dialogues state={props.state.dialoguesPage} />}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
