import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";


type FriendsType = {
    id: number
    friendName: string
    ava: string
}

type NavbarPropsType = {
    friendsBar: FriendsType[]
}
const Navbar = (props: NavbarPropsType) => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogues" activeClassName={s.activeLink}>Messages</NavLink>
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
            <span>
                    {props.friendsBar.map(el => {
                        return (
                            <span key={el.id}>
                           <img src={el.ava}  />
                                {el.friendName }
                            </span>)
                    })}
            </span>
        </nav>
    )
};

export default Navbar;