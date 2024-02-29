import {AxiosResponse} from "axios";
import {instance} from "./api";
import {CommonResponse, GetItemsResponse} from "./types";

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetItemsResponse>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    followUsers(userId: number) {
        return instance.post<AxiosResponse<CommonResponse>>(`follow/${userId}`).then(res => res.data)
    },
    unfollowUsers(userId: number) {
        return instance.delete<AxiosResponse<CommonResponse>>(`follow/${userId}`).then(res => res.data)
    }
}