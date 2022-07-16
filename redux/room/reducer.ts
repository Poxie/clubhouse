import initialState from "./initialState";
import { RESET_ROOM_INFO, RoomReducer, SET_ROOM_INFO } from "./types";

export const roomReducer: RoomReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_ROOM_INFO: {
            return {
                ...state,
                loading: false,
                roomInfo: action.payload
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