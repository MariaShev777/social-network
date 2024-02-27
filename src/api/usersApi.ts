import {AxiosResponse} from "axios";
import {GetItems, instance, ResponseType} from "./api";

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetItems>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    followUsers(userId: number) {
        return instance.post<AxiosResponse<ResponseType>>(`follow/${userId}`).then(res => res.data)
    },
    unfollowUsers(userId: number) {
        return instance.delete<AxiosResponse<ResponseType>>(`follow/${userId}`).then(res => res.data)
    }
}