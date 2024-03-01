import usersReducer, {
    follow,
    followUsersThunkCreator,
    toggleFollowingProgress,
    unfollow,
    UsersPageType
} from "redux/usersReducer";
import {usersAPI} from "api/usersApi";
import {CommonResponse} from "api/types";
import {ResultCode} from "types/enum";


jest.mock("api/usersApi")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

let state: UsersPageType;

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'name 0', followed: false, photos: {small: null, large: null}, status: 'status 0'},
            {id: 1, name: 'name 1', followed: false, photos: {small: null, large: null}, status: 'status 1'},
            {id: 2, name: 'name 2', followed: true, photos: {small: null, large: null}, status: 'status 2'},
            {id: 3, name: 'name 3', followed: true, photos: {small: null, large: null}, status: 'status 3'},
        ],
        pageSize: 7,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})
;
test('follow success', () => {
    const newState = usersReducer(state, follow(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = usersReducer(state, unfollow(3))
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})

const result:CommonResponse = {
    resultCode: ResultCode.Success,
    messages: [],
    data: {},
    fieldsErrors: []
}


usersAPIMock.followUsers.mockReturnValue(Promise.resolve(result))

test('follow thunk', async() => {
    const thunk = followUsersThunkCreator(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, follow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1))
})
