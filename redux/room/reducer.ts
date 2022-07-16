import initialState from "./initialState";
import { RESET_ROOM_INFO, RoomInfo, RoomReducer, SET_ROOM_INFO, SET_ROOM_USERS } from "./types";

export const roomReducer: RoomReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_ROOM_INFO: {
            return {
                ...state,
                loading: false,
                roomInfo: action.payload
            }
        }
        case SET_ROOM_USERS: {
            return {
                ...state,
                roomInfo: {
                    ...state.roomInfo as RoomInfo,
                    users: (action.payload || [])
                }
            }
        }
        case RESET_ROOM_INFO: {
            return {
                loading: true,
                roomInfo: null
            }
        }
        default:
            return state;
    }
}