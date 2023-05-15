import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {RootStateType, StoreType} from "../../../redux/store";
import StoreContext from "../../../StoreContext";


type MyPostsContainerPropsType = {
    // store: StoreType
}

const MyPostsContainer = (props: MyPostsContainerPropsType) => {


    return (
        <StoreContext.Consumer>
            { (store) => {
                let state = store.getState();

                let addPost = () => {
                    store.dispatch(addPostActionCreator());
                }

                let onPostChange = (text: string) => {
                    store.dispatch(updateNewPostTextActionCreator(text));
                }

                return <MyPosts updateNewPostText={onPostChange}
                         addPost={addPost}
                         posts={state.profilePage.posts}
                         newPostText={state.profilePage.newPostText}/>
            }
        }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;