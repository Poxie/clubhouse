import { User } from "../user/types";
import initialState from "./initialState";

// Action constants
export type ACTION_TYPE = 'SET_ROOM_INFO' | 'SET_ROOM_USERS' | 'SET_ROOM_MESSAGES' | 'ADD_ROOM_MESSAGE' | 'RESET_ROOM_INFO';
export const SET_ROOM_INFO: ACTION_TYPE = 'SET_ROOM_INFO';
export const SET_ROOM_USERS: ACTION_TYPE = 'SET_ROOM_USERS';
export const SET_ROOM_MESSAGES: ACTION_TYPE = 'SET_ROOM_MESSAGES';
export const ADD_ROOM_MESSAGE: ACTION_TYPE = 'ADD_ROOM_MESSAGE';
export const RESET_ROOM_INFO: ACTION_TYPE = 'RESET_ROOM_INFO';

// Room state types
export type Message = {
    id: string;
    author: User;
    message: string;
    createdAt: string;
}
export type RoomInfo = {
    name: string;
    description: string | null;
    users: User[];
    messages: Message[];
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