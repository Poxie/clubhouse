import { User } from "../user/types";
import { ADD_ROOM_MESSAGE, Message, RESET_ROOM_INFO, RoomInfo, SET_ROOM_INFO, SET_ROOM_MESSAGES, SET_ROOM_USERS } from "./types";

export const setRoomInfo = (roomInfo: RoomInfo) => ({
    type: SET_ROOM_INFO,
    payload: roomInfo
})
export const setRoomUsers = (users: User[]) => ({
    type: SET_ROOM_USERS,
    payload: users
})
export const setRoomMessages = (messages: Message[]) => ({
    type: SET_ROOM_MESSAGES,
    payload: messages
})
export const addRoomMessage = (message: Message) => ({
    type: ADD_ROOM_MESSAGE,
    payload: message
})
export const resetRoomInfo = () => ({
    type: RESET_ROOM_INFO
})