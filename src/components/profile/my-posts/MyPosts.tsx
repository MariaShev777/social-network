import React from "react";
import s from "components/profile/my-posts/myPosts.module.css";
import Post from "./post/Post";
import {PostType} from "redux/profileReducer";
import AddPostForm, {AddPostFormData} from "./add-post-form/AddPostForm";

export type MapStateToPropsType = {
    posts: PostType[]
}

export type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}

type MyPosts = MapStateToPropsType & MapDispatchToPropsType


const MyPosts = React.memo((props: MyPosts) => {

    let postsElement = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const onAddPost = (values: AddPostFormData) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <div className={s.postsForm}>
                <h3>My posts</h3>
                <AddPostForm onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
})

export default MyPosts;