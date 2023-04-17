import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";


type MyPostsContainerPropsType = {
    store: any
}

const MyPostsContainer = (props: MyPostsContainerPropsType) => {

    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    let onPostChange = (text: string) => {
        props.store.dispatch(updateNewPostTextActionCreator(text));
    }

    return (
        <MyPosts updateNewPostText={onPostChange} addPost={addPost}
                     posts={state.profilePage.posts}
                     newPostText={state.profilePage.newPostText}/>
    )
}

export default MyPostsContainer;