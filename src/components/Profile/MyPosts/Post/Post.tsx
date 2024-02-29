import React from 'react';
import s from './Post.module.css';
import {LikedIcon, NotLikedIcon} from "assets/icons";



type Props = {
    message: string
    likesCount: number
}

const Post = (props: Props) => {
    return (
        <div className={s.item}>
            <img src="https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1" alt={'picture'}/>
            {props.message}
            <div className={s.likes}>
                <span>
                    <LikedIcon />
                    <NotLikedIcon />
                    {props.likesCount}
                </span>
            </div>
        </div>
    )
};

export default Post;