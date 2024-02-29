import {ResultCode} from "../../types/enum";
import {UserType} from "../../types/types";

export type CommonResponse<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: ResultCode
}

export type MeResponse = {
    id: number
    email: string
    login: string
}

export type GetItemsResponse = {
    items: UserType[]
    totalCount: number
    error: string | null
}


export type GetCaptchaUrl = {
    url: string
}