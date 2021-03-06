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

export const selectRoomMessages = (state: RootState) => state.room.roomInfo?.messages || [];
export const selectRoomMessageIds = createSelector(
    [selectRoomMessages],
    messages => messages.map(message => message.id)
);
export const selectRoomMessage = createSelector(
    [selectRoomMessages, selectId],
    (messages, messageId) => messages.find(message => message.id === messageId)
);

export const selectRequestingToSpeak = (state: RootState) => state.room.roomInfo?.users.filter(user => user.requestToSpeak) || [];
export const selectRequestingToSpeakIds = createSelector(
    [selectRequestingToSpeak],
    users => users.map(user => user.uid)
)