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
import {RootStateType, StoreType} from "./redux/store";

type AppPropsType = {
    store: StoreType
}


function App (props: AppPropsType) {
    return (
            <div className="app-wrapper">
                <Header/>
                <Navbar friendsBar={props.store.getState().sidebar.friends}/>
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
