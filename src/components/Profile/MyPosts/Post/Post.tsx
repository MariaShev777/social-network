import React from 'react';
import s from './Post.module.css';
import {LikedIcon} from "../../../../assets/icons/LikedIcon";
import {NotLikedIcon} from "../../../../assets/icons/NotLikedIcon";


type PostType = {
    id: number
    message: string
    likesCount: number
}


const Post = (props: PostType) => {

    return (
        <div className={s.item}>
            <img src="https://www.surfertoday.com/images/stories/surfingdog.jpg"/>
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