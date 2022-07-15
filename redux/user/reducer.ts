import initialState from "./initialState";
import { UserReducer } from "./types";

export const userReducer: UserReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_USER': {
            return {
                ...state,
                loading: false,
                user: action.payload
            }
            break;
        }
        default:
            return state;
    }
}