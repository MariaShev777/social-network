import axios, {AxiosResponse} from "axios";
import {ProfileFormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {ResultCode} from "../types/enum";
import {UserType} from "../types/types";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "0bcedaa4-1f0f-4539-8da0-be2bd092c459"
    }
})

export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: ResultCode
}


export type MeResponseData = {
        id: number
        email: string
        login: string
}


export type GetItems = {
    items: UserType[]
    totalCount: number
    error: string | null
}

