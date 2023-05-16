import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {DialoguesContainer} from "./components/Dialogues/DialoguesContainer";
import store from "./redux/redux-store";
import {UsersContainer} from "./components/Users/UsersContainer";


function App () {
    return (
            <div className="app-wrapper">
                <Header/>
                <Navbar friendsBar={store.getState().sidebar.friends}/>
                <div className="app-wrapper-content">
                    <Route path="/profile" render={() => <Profile />}/>
                    <Route path="/dialogues" render={() => <DialoguesContainer />}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>

                    <Route path="/users" render={() => <UsersContainer />}/>
                </div>
            </div>
    );
}

export default App;
