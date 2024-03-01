import React from "react";
import {addPostActionCreator} from "redux/profileReducer";
import MyPosts, {MapDispatchToPropsType, MapStateToPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "redux/redux-store";
import {Dispatch} from "redux";

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText))
        }
    }
}

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;