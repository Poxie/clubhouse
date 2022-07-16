import { User } from "../user/types";
import initialState from "./initialState";

// Action constants
export type ACTION_TYPE = 'SET_ROOM_INFO' | 'RESET_ROOM_INFO';
export const SET_ROOM_INFO: ACTION_TYPE = 'SET_ROOM_INFO';
export const RESET_ROOM_INFO: ACTION_TYPE = 'RESET_ROOM_INFO';

// Room state types
export type RoomInfo = {
    name: string;
    description: string | null;
    users: User[];
    tags: string[];
    createdAt: Date;
}
export type RoomState = typeof initialState;
export type RoomReducer = (
    state: RoomState,
    action: {
        type: ACTION_TYPE,
        payload?: any
    }
) => RoomState;