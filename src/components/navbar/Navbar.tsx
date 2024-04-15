import React from 'react';
import s from './navbar.module.css'
import {NavLink} from "react-router-dom";
import {FriendsType} from "redux/sidebarReducer";

type Props = {
    friends: FriendsType[]
}

const Navbar = (props: Props) => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" className={({isActive}) => isActive ? s.activeLink : ''}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogues" className={({isActive}) => isActive ? s.activeLink : ''}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" className={({isActive}) => isActive ? s.activeLink : ''}>Users</NavLink>
            </div>

            <div className={s.friendsBar}>FRIENDS</div>

        </nav>
    )
};

export default Navbar;