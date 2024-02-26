import React from "react";
import userPhoto from '../../assets/images/noname.png';

import s from './users.module.css'
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";


type UserPropsType = {
    user: UserType
    followingInProgress: number[]
    unfollowUsersThunkCreator: (userId: number) => void
    followUsersThunkCreator: (userId: number) => void
}


export const User = (props: UserPropsType) => {

    return <div className={s.userContainer}>
            <div className={s.avaAndButton}>
                <div>
                    <NavLink to={"/profile/" + props.user.id}>
                     <img src={props.user.photos.small !== null ? props.user.photos.small : userPhoto} className={s.userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {props.user.followed
                        ? <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                            props.unfollowUsersThunkCreator(props.user.id)
                        }}>UnFOLLOW</button>
                        : <button className={'button'} disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                            props.followUsersThunkCreator(props.user.id)
                        }}>FOLLOW</button>}
                </div>
            </div>
            <span>
               <span>
                   <div>{props.user.name}</div>
                   <div>{props.user.status}</div>
               </span>
               <span>
                   <div>{"props.user.location.country"}</div>
                   <div>{"props.user.location.city"}</div>
               </span>
            </span>
        </div>
}

