import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "0bcedaa4-1f0f-4539-8da0-be2bd092c459"
    }
})

enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}


export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: ResultCodes
}


export const usersAPI = {
    getUsers (currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUsers (userId: number) {
        return instance.post<AxiosResponse<ResponseType>>(`follow/${userId}`)
    },
    unfollowUsers (userId: number) {
        return instance.delete<AxiosResponse<ResponseType>>(`follow/${userId}`)
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





