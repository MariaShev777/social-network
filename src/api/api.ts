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
    }
}

export const profileAPI = {
    getProfile (userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus (userId: number)  {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus (status: string) {
        return instance.put(`profile/status`, {status})
    },
    uploadPhoto (photo: string) {
        return instance.put(`profile/photo/`, {photo})
    }
}


export const authAPI = {
    logInMe () {
        return instance.get('auth/me');
    },
    logIn (email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`/auth/login`, {email, password, rememberMe});
    },
    logOut () {
        return instance.delete(`/auth/login`);
    }
}





