import { combineReducers } from "redux";
import { roomReducer } from "./room/reducer";
import { userReducer } from "./user/reducer";

export default combineReducers({
    user: userReducer,
    room: roomReducer
})