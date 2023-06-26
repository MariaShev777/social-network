import React from "react";
import userPhoto from '../../assets/images/noname.png';
import {UserType} from "../../redux/usersReducer";
import s from './users.module.css'
import {NavLink} from "react-router-dom";
import axios from "axios";


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}



export const Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= 30; i++) {
        pages.push(i)
    }


    return <div>
        <div className={s.pages}>
            {pages.map((p, index) => {

                return <span key={index} className={props.currentPage === p ? s.selectedPage : ""}
                             onClick={(e) => props.onPageChanged(p)}>{p}</span>
            })}

        </div>
        {props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <NavLink to={"/profile/" + u.id}>
                     <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={s.userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => {
                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {withCredentials: true})
                                .then((response) => {
                                    if (response.data.resultCode === 0) {
                                        props.unfollow(u.id);
                                    }
                                })
                        }}>UnFOLLOW</button>
                        : <button onClick={() => {
                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {withCredentials: true})
                                .then((response) => {
                                    if (response.data.resultCode === 0) {
                                        props.follow(u.id);
                                    }
                                })
                        }}>FOLLOW</button>}
                </div>
            </span>
            <span>
               <span>
                   <div>{u.name}</div>
                   <div>{u.status}</div>
               </span>
               <span>
                   <div>{"u.location.country"}</div>
                   <div>{"u.location.city"}</div>
               </span>
            </span>
        </div>)
        }
    </div>
}

