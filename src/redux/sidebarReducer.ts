import richi from "./imgs/richi.jpg";
import musya from "./imgs/musya.jpg";
import sharik from "./imgs/sharik.jpg";
import {SidebarType} from "../App";

let initialState = {
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


const sidebarReducer = (state: SidebarType = initialState, action: any) => {


    return state;
}

export default sidebarReducer;