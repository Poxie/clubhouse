import React from 'react';
import { selectRequestingToSpeakIds } from '../../redux/room/hooks';
import { useAppSelector } from '../../redux/store';
import styles from '../../styles/Room.module.scss';
import { RoomRequestToSpeakUser } from './RoomRequestToSpeakUser';
import { RoomUser } from './RoomUser';

export const RoomRequestToSpeak = () => {
    const userIds = useAppSelector(selectRequestingToSpeakIds);
    return(
        <div className={styles['request-to-speak']}>
            <div className={styles['request-to-speak-header']}>
                Requests to speak
            </div>
            
            {userIds.map(userId => <RoomRequestToSpeakUser uid={userId} key={userId} />)}

            {!userIds.length && (
                <span className={styles['request-to-speak-empty']}>
                    Requests to speak will appear here.
                </span>
            )}
        </div>
    )
}