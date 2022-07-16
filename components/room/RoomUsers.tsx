import React from 'react';
import styles from '../../styles/Room.module.scss';
import { selectRoomListenerIds, selectRoomSpeakerIds } from '../../redux/room/hooks';
import { useAppSelector } from '../../redux/store';
import { RoomUserGroup } from './RoomUserGroup';

export const RoomUsers = () => {
    const speakerIds = useAppSelector(selectRoomSpeakerIds);
    const listenerIds = useAppSelector(selectRoomListenerIds);

    return(
        <div className={styles['users']}>
            {speakerIds.length !== 0 && (
                <RoomUserGroup 
                    userIds={speakerIds}
                    label={'Speakers'}
                />
            )}
            {listenerIds.length !== 0 && (
                <RoomUserGroup 
                    userIds={listenerIds}
                    label={'Listeners'}
                />
            )}
        </div>
    )
}