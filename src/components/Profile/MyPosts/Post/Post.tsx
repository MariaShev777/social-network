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
            <div>
                <span>like{props.likes}</span>
            </div>
        </div>
    )
};

export default Post;