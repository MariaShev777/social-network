import React from "react";
import userPhoto from '../../assets/images/noname.png';
import { UserType} from "../../redux/usersReducer";
import s from './users.module.css'
import {NavLink} from "react-router-dom";


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: number[]
    unfollowUsersThunkCreator: (userId: number) => void
    followUsersThunkCreator: (userId: number) => void
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


                        ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                            props.unfollowUsersThunkCreator(u.id)
                        }}>UnFOLLOW</button>


                        : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                            props.followUsersThunkCreator(u.id)
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

