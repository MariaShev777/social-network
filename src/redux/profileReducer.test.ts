import profileReducer, {
    addPostActionCreator,
    deletePostActionCreator,
    ProfilePageType
} from "./profileReducer";


let state: ProfilePageType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 15},
        {id: 2, message: "It's my first post", likesCount: 21},
        {id: 3, message: "WoW", likesCount: 25},
        {id: 4, message: "See ya", likesCount: 29},
    ],
    profile: null,
    status: ''
};


it('new post should be added', () => {
    let action = addPostActionCreator('IT-MASHA');

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(5);
})


it('message of a new post should be correct', () => {
    let action = addPostActionCreator('IT-MAaaaSHA');

    let newState = profileReducer(state, action);

    expect(newState.posts[0].message).toBe('IT-MAaaaSHA');
})

it('after deleting length of messages should be dicreased', () => {
    let action = deletePostActionCreator(1);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
})