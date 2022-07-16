import { RESET_ROOM_INFO, RoomInfo, SET_ROOM_INFO } from "./types";

export const setRoomInfo = (roomInfo: RoomInfo) => ({
    type: SET_ROOM_INFO,
    payload: roomInfo
})
export const resetRoomInfo = () => ({
    type: RESET_ROOM_INFO
})