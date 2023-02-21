import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

type PostType = {
    id: number
    message: string
    likesCount: number
}

type MyPostsPropsType = {
    state: PostType[]
}

const MyPosts = (props: MyPostsPropsType) => {

    let postsElement = props.state.map( p => <Post message={p.message} likesCount={p.likesCount} id={p.id}/> )

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
};

export default MyPosts;