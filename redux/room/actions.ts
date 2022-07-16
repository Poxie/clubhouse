import { User } from "../user/types";
import { RESET_ROOM_INFO, RoomInfo, SET_ROOM_INFO, SET_ROOM_USERS } from "./types";

export const setRoomInfo = (roomInfo: RoomInfo) => ({
    type: SET_ROOM_INFO,
    payload: roomInfo
})
export const setRoomUsers = (users: User[]) => ({
    type: SET_ROOM_USERS,
    payload: users
})
export const resetRoomInfo = () => ({
    type: RESET_ROOM_INFO
})