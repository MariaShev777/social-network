import React from 'react';
import s from './Post.module.css';


type PostType = {
    message: string
    likes: number
}


const Post = (props: PostType) => {

    return (
        <div className={s.item}>
            <img src="https://www.surfertoday.com/images/stories/surfingdog.jpg"/>
            {props.message}
            <div className={s.likes}>
                <span>like</span> {props.likes}
            </div>
        </div>
    )
};

export default Post;