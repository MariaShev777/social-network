import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";


const Profile = () => {
    return (
        <div>
            <div>
                <img
                    src="https://img.freepik.com/premium-vector/tropical-fish-cartoon-icon-isolated-cartoon-icon-aquarium-animals-vector-illustration-tropical-fish-white-background_158626-484.jpg?w=2000"
                    width="995px"/>
            </div>
            <div>
                <img src="https://i.redd.it/oz628d4ene331.jpg" width="100px"/>
                ava + description
            </div>
            <MyPosts/>
        </div>
    )
};

export default Profile;