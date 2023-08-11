import {UserType} from "../../redux/usersReducer";

export const updateObjectInArray = (items: UserType[], itemId: number, objPropName: keyof UserType, newObjProps: any) => {
    return items.map(u => u[objPropName] === itemId ? {...u, ...newObjProps} : u)
}