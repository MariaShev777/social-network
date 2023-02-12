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


type DialoguesType = {
   id: number
   name: string
}

type MessagesType = {
    id: number
    message: string
}

type PostsType = {
    id: number
    message: string
    likesCount: number
}

type AppPropsType = {
    dialogues: DialoguesType[]
    messages: MessagesType[]
    posts: PostsType[]
}


function App(props: AppPropsType) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/profile" render={() => <Profile posts={props.posts}/>}/>
                    <Route path="/dialogues" render={() => <Dialogues dialogues={props.dialogues} messages={props.messages} />}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
