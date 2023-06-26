import axios from "axios";

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})


export const usersAPI = {
    getUsers (currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUsers (userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollowUsers (userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    logIn () {
        return instance.get('auth/me')
    }
}








