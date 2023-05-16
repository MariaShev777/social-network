import React from 'react';
import s from './users.module.css'
import {UsersPropsType} from "./UsersContainer";


let Users = (props: UsersPropsType) => {

    if (props.usersPage.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: "https://media.istockphoto.com/id/183417992/photo/cute-puppy-wearing-pink-rabbit-ears-for-easter.jpg?s=612x612&w=0&k=20&c=2jQ-2YMfwdcaPaCfK4ieZtiXUOrwT1PfJmNI55gxHf8=",
                followed: false,
                fullName: "Kesha",
                status: "I'm a Boss",
                location: {city: "Minsk", country: "Belarus"}
            },
            {
                id: 2,
                photoUrl: "https://media.istockphoto.com/id/183417992/photo/cute-puppy-wearing-pink-rabbit-ears-for-easter.jpg?s=612x612&w=0&k=20&c=2jQ-2YMfwdcaPaCfK4ieZtiXUOrwT1PfJmNI55gxHf8=",
                followed: true,
                fullName: "Richi",
                status: "Food",
                location: {city: "Sidney", country: "Australia"}
            },
            {
                id: 3,
                photoUrl: "https://media.istockphoto.com/id/183417992/photo/cute-puppy-wearing-pink-rabbit-ears-for-easter.jpg?s=612x612&w=0&k=20&c=2jQ-2YMfwdcaPaCfK4ieZtiXUOrwT1PfJmNI55gxHf8=",
                followed: false,
                fullName: "Musya",
                status: "prr",
                location: {city: "London", country: "England"}
            }
        ])
    }

    return <div>
        {props.usersPage.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photoUrl} className={s.userPhoto}/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => {props.unfollow(u.id)}}>UnFOLLOW</button>
                        : <button onClick={() => {props.follow(u.id)}}>FOLLOW</button>}
                </div>
            </span>
            <span>
               <span>
                   <div>{u.fullName}</div>
                   <div>{u.status}</div>
               </span>
               <span>
                   <div>{u.location.country}</div>
                   <div>{u.location.city}</div>
               </span>
            </span>
        </div>)
        }
    </div>
}

export default Users;