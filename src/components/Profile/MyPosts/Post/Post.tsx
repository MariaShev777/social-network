import React from 'react';
import s from './Post.module.css';


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
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
};

export default Post;