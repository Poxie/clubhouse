import React from 'react';
import styles from '../../styles/Room.module.scss';
import { selectRoomUserIds } from '../../redux/room/hooks';
import { useAppSelector } from '../../redux/store';
import { RoomUser } from './RoomUser';

export const RoomUsers = () => {
    const userIds = useAppSelector(selectRoomUserIds);
    return(
        <div className={styles['user-group']}>
            <p className={styles['group-title']}>
                Speakers — {userIds.length}
            </p>
            <div className={styles['user-container']}>
                {userIds.map(userId => (
                    <RoomUser
                        uid={userId}
                        key={userId}
                    />
                ))}
            </div>
        </div>
    )
}