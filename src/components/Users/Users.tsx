import React from 'react';
import s from './users.module.css'
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";
import userPhoto from '../../assets/images/noname.png';


export class Users extends React.Component<UsersPropsType> {

    constructor(props: any) {
        super(props);
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render () {
        return <div>
            {this.props.usersPage.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={s.userPhoto}/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => {this.props.unfollow(u.id)}}>UnFOLLOW</button>
                        : <button onClick={() => {this.props.follow(u.id)}}>FOLLOW</button>}
                </div>
            </span>
                <span>
               <span>
                   <div>{u.name}</div>
                   <div>{u.status}</div>
               </span>
               <span>
                   <div>{'u.location.country'}</div>
                   <div>{'u.location.city'}</div>
               </span>
            </span>
            </div>)
            }
        </div>
    }
}
