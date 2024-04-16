import React from 'react';
import s from 'components/profile/my-posts/post/post.module.css';
import {LikedIcon} from "assets";


type Props = {
    message: string
    likesCount: number
}

const Post = (props: Props) => {
    return (
        <div className={s.item}>
            <div className={s.avaMessage}>
                <img src="https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1"
                     alt={'picture'}/>
                <div>{props.message}</div>
            </div>

            <div className={s.likes}>
                <span className={s.likesBlock}>
                    <LikedIcon/>
                    {props.likesCount}
                </span>
            </div>
        </div>
    )
};

export default Post;