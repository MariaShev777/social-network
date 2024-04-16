import React from 'react';
import {Button, Col, Layout, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthSelector, getLoginSelector} from "redux/auth-selectors";
import {logOutTC} from "redux/authReducer";
import {Link} from "react-router-dom";
import logo from './../../assets/images/white_logo-03.svg'
import s from './header.module.css'

const {Header} = Layout;

export const AppHeader = () => {
        const isAuth = useSelector(getIsAuthSelector)
        const login = useSelector(getLoginSelector)

        const dispatch = useDispatch()

        const logout = () => {
            dispatch(logOutTC())
        }

        return (
            <Header className={s.header}>
                <Row style={{height: '64px'}}>
                    <Col span={18} style={{height: '64px'}}>
                        <img src={logo} alt={'logo'}/>
                    </Col>
                    {isAuth
                        ? <Col span={6} className={s.logoutBlock}>{login}
                            <Button className={'button'} onClick={logout}>Log out</Button>
                        </Col>
                        : <Col span={6} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                            <Button><Link
                                to={"/login"}>Login</Link></Button>
                        </Col>}
                </Row>
            </Header>
        )
    }
;