import initialState from "./initialState";
import { ADD_ROOM_MESSAGE, Message, RESET_ROOM_INFO, RoomInfo, RoomReducer, SET_ROOM_INFO, SET_ROOM_MESSAGES, SET_ROOM_USERS } from "./types";

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
        case SET_ROOM_MESSAGES: {
            return {
                ...state,
                roomInfo: {
                    ...state.roomInfo as RoomInfo,
                    messages: action.payload
                }
            }
        }
        case ADD_ROOM_MESSAGE: {
            const newMessages = [...(state.roomInfo?.messages || []), ...[action.payload]];
            newMessages.sort((a,b) => a.createdAt - b.createdAt);
            return {
                ...state,
                roomInfo: {
                    ...state.roomInfo as RoomInfo,
                    messages: newMessages
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