import React from 'react';
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import s from './navbar.module.css'

const {Sider} = Layout;

export const Navbar = () => {
    return (
        <Sider width="22%" className={s.siderStyle} style={{backgroundColor: '#333232'}}>
            <Menu className={s.menuStyle}
                  theme="dark"
                  mode="inline"
                  items={[
                      {
                          key: '1',
                          label: <Link to="/profile">Profile</Link>,

                      },
                      {
                          key: '2',
                          label: <Link to="/dialogues">Messages</Link>,
                      },
                      {
                          key: '3',
                          label: <Link to="/users">Users</Link>,
                      },
                      {
                          key: '4',
                          label: <Link to="/chat">Chat</Link>,
                      },
                  ]}
            />
            <div className={s.friendsBlock}>
                FRIENDS
            </div>
        </Sider>
    )
};