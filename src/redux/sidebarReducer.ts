import richi from "./imgs/richi.jpg";
import musya from "./imgs/musya.jpg";
import sharik from "./imgs/sharik.jpg";


export type FriendsType = {
    id: number
    friendName: string
    ava: string
}

export type SidebarType = {
    friends: FriendsType[]
}

let initialState: SidebarType = {
    friends: [
        {
            id: 1,
            friendName: "Richi",
            ava: richi
        },
        {
            id: 2,
            friendName: "Musya",
            ava: musya
        },
        {
            id: 3,
            friendName: "Sharik",
            ava: sharik
        }
    ]
}


const sidebarReducer = (state: SidebarType = initialState, action: any): SidebarType => {

    return state;
}

export default sidebarReducer;