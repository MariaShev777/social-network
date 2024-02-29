import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {FriendsType} from "../../redux/sidebarReducer";

type Props = {
    friends: FriendsType[]
}

const Navbar = (props: Props) => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogues" activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/news" activeClassName={s.activeLink}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/music" activeClassName={s.activeLink}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/settings" activeClassName={s.activeLink}>Settings</NavLink>
            </div>

            <div className={s.friendsBar}>FRIENDS</div>
            <div className={s.friends}>{props.friends.map(el => {
                return (
                    <div key={el.id} className={s.friend}>
                        <img src={el.ava}/>
                        <span>{el.friendName}</span>
                    </div>
                )
            })}
            </div>
        </nav>
    )
};

export default Navbar;