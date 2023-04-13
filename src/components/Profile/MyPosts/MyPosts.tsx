import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostType} from "../../../App";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/state";


type MyPostsPropsType = {
    posts: PostType[]
    newPostText: string
    dispatch: (action: any) => void
}





const MyPosts = (props: MyPostsPropsType) => {

    let postsElement = props.posts.map( p => <Post message={p.message} likesCount={p.likesCount} id={p.id}/> )

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        // let text = newPostElement.current?.value;
        // if (text) {
            props.dispatch(addPostActionCreator());
        }
        // newPostElement.current!.value = ''

    let onPostChange = () => {
        let text = newPostElement.current?.value;
        if (text) {
            // props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: text});
            props.dispatch(updateNewPostTextActionCreator(text));
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}

export default MyPosts;