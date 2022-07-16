import initialState from "./initialState";

// Action constants
export type ACTION_TYPE = 'SET_USER';
export const SET_USER: ACTION_TYPE = 'SET_USER';

// User state types
export type User = {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    muted: boolean;
    deafened: boolean;
    owner: boolean;
    speaker: boolean;
}
export type UserState = typeof initialState;
export type UserReducer = (
    state: UserState,
    action: {
        type: ACTION_TYPE,
        payload?: any
    }
) => UserState;