import {instance, MeResponseData, ResponseType} from "./api";

export const authAPI = {
    me () {
        return instance.get<ResponseType<MeResponseData>>('auth/me').then(res => res.data);
    },
    logIn (email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<ResponseType<{userId: number}>>(`/auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data);
    },
    logOut () {
        return instance.delete(`/auth/login`);
    }
}