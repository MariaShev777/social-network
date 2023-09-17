import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostType} from "../../../redux/profileReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../Common/FormsControls/FormsControls";

type MyPostsPropsType = {
    posts: PostType[]
    addPost: (newPostText: string) => void
}

// shouldComponentUpdate(nextProps: Readonly<MyPostsPropsType>, nextState: Readonly<{}>): boolean {
//     return nextProps !== this.props || nextState !== this.state;
// } // это для просто Component, а не PureComponent


const MyPosts = React.memo((props: MyPostsPropsType) => {

    let postsElement = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}
                                                  id={p.id}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const onAddPost = (values: AddNewPostFormDataType) => {
        props.addPost(values.newPostText);
    }


    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
})

type AddNewPostFormDataType = {
    newPostText: string
}


const maxLength10 = maxLengthCreator(10);

let AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormDataType>> = (props) => {


    return (
        <div className={s.addPostBlock}>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field className={"generalInput"} type={"text"} name="newPostText" component={TextArea}
                           placeholder="Post message" validate={[required, maxLength10]}/>
                </div>
                <div>
                    <button className={"button"}>Add post</button>
                </div>
            </form>
        </div>
    )
}

const AddNewPostFormRedux = reduxForm<AddNewPostFormDataType>({form: "profileAddNewPostForm"})(AddNewPostForm)

export default MyPosts;