import { SET_USER, User } from "./types";

export const setUser = (user: User) => ({
    type: SET_USER,
    payload: user
})