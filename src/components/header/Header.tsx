import React from 'react';
import {Avatar, Button, Col, Layout, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthSelector, getLoginSelector} from "redux/auth-selectors";
import {logOutTC} from "redux/authReducer";
import {Link} from "react-router-dom";

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
            lineHeight: '64px',
            backgroundColor: '#4096ff',
        };

        return (
            <Header style={headerStyle}>
                <Row>
                    <Col span={18}>
                        <img src={'https://raw.githubusercontent.com/infinitered/dogs-n-cats/HEAD/_art/dnc_logo.png'}
                             width={72}/>
                    </Col>
                    {isAuth
                        ? <Col span={6}>{login}
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                            <Button className={'button'} onClick={logout}>Log out</Button>
                        </Col>
                        : <Col span={6}> <Button><Link to={"/login"}>Login</Link></Button>
                        </Col>}
                </Row>
            </Header>

// <img src="https://raw.githubusercontent.com/infinitered/dogs-n-cats/HEAD/_art/dnc_logo.png"/>
// <div className={s.loginBlock}>
//     {isAuth
//         ? <div>{login}
//             <button className={'button'} onClick={logout}>Log out</button>
//         </div>
//         : <NavLink to={"/login"}>Login</NavLink>}
// </div>

        )
    }
;