import { RootState } from "../store";

export const selectRoomLoading = (state: RootState) => state.room.loading;
export const selectRoomHeader = (state: RootState) => ({
    name: state.room.roomInfo?.name,
    description: state.room.roomInfo?.description
});
export const selectRoomUsers = (state: RootState) => state.room.roomInfo?.users || [];