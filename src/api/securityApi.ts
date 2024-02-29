import {instance} from "./api";
import {GetCaptchaUrl} from "./types";

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrl>('security/get-captcha-url').then(res => res.data);
    }
}