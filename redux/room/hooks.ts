import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectRoomLoading = (state: RootState) => state.room.loading;
export const selectRoomHeader = (state: RootState) => ({
    name: state.room.roomInfo?.name,
    description: state.room.roomInfo?.description
});
export const selectRoomUsers = (state: RootState) => state.room.roomInfo?.users || [];
export const selectSpeakingUsers = (state: RootState) => state.room.roomInfo?.users?.filter(user => user.speaker) || [];
export const selectListeningUsers = (state: RootState) => state.room.roomInfo?.users?.filter(user => !user.speaker) || [];
export const selectRoomUserIds = createSelector(
    [selectRoomUsers],
    users => users.map(user => user.uid)
);
export const selectRoomSpeakerIds = createSelector(
    [selectSpeakingUsers],
    users => users.map(user => user.uid)
)
export const selectRoomListenerIds = createSelector(
    [selectListeningUsers],
    users => users.map(user => user.uid)
)
export const selectId = (_: any, id: string) => id;
export const selectRoomUser = createSelector(
    [selectRoomUsers, selectId],
    (users, id) => users.find(user => user.uid === id)
);