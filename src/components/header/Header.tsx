import React from 'react';
import {Avatar, Button, Col, Layout, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthSelector, getLoginSelector} from "redux/auth-selectors";
import {logOutTC} from "redux/authReducer";
import {Link, NavLink} from "react-router-dom";
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

        const headerStyle: React.CSSProperties = {
            // textAlign: 'center',
            color: '#fff',
            height: 64,
            // paddingInline: 48,
            padding: '0 26px',
            lineHeight: '64px',
            backgroundColor: '#333232',

            justifyContent: 'space-between',
        };

        return (
            <Header style={headerStyle}>
                <Row style={{height: '64px'}} >
                    <Col span={18} style={{height: '64px'}}>
                        <img src={logo} width={200}/>
                    </Col>
                    {isAuth
                        ? <Col span={6}>{login}
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined rev={undefined}/>}/>
                            <Button className={'button'} onClick={logout}>Log out</Button>
                        </Col>
                        : <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}> <Button><Link
                            to={"/login"}>Login</Link></Button>
                        </Col>}
                </Row>
            </Header>

        // {/*<div className={s.loginBlock}>*/
        // }
        // {/*    {isAuth*/
        // }
        // {/*        ? <div>{login}*/
        // }
        // {/*            <button className={'button'} onClick={logout}>Log out</button>*/
        // }
        // {/*        </div>*/
        // }
        // {/*        : <NavLink to={"/login"}>Login</NavLink>}*/
        // }
        // {/*</div>*/



    )
    }
;