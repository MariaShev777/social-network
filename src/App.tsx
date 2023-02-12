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


// type DialoguesType = {
//    id: number
//    name: string
// }
//
// type MessagesType = {
//     id: number
//     message: string
// }
//
// type AppPropsType = {
//     dialogues: DialoguesType[]
//     messages: MessagesType[]
// }


function App(/*props: AppPropsType*/) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    {/*<Route path='/profile' component={Profile} />*/}
                    {/*<Route path='/dialogues' component={Dialogues}/>*/}
                    {/*<Route path='/news' component={News}/>*/}
                    {/*<Route path='/music' component={Music}/>*/}
                    {/*<Route path='/settings' component={Settings}/>*/}

                    <Route path="/profile" render={() => <Profile/>}/>
                    <Route path="/dialogues" render={() => <Dialogues/>}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
