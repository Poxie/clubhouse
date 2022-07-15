import { $CombinedState, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reducer from "./reducer";
import { UserState } from "./user/types";

// Creating store
const makeStore = () => configureStore({ reducer });
export const wrapper = createWrapper(makeStore);

// Types
type Store = ReturnType<typeof makeStore>;
export type RootState = {
    readonly [$CombinedState]?: undefined;
} & {
    user: UserState;
}
export type AppDispatch = Store['dispatch'];

// Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;