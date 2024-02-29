import {instance} from "./api";
import {CommonResponse, MeResponse} from "./types";

export const authAPI = {
    me() {
        return instance.get<CommonResponse<MeResponse>>('auth/me').then(res => res.data);
    },
    logIn(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<CommonResponse<{ userId: number }>>(`/auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data);
    },
    logOut() {
        return instance.delete(`/auth/login`);
    }
}