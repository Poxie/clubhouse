import React from 'react';
import styles from '../../styles/Room.module.scss';
import { selectRoomUsers } from '../../redux/room/hooks';
import { useAppSelector } from '../../redux/store';
import { RoomUser } from './RoomUser';

export const RoomUsers = () => {
    const users = useAppSelector(selectRoomUsers);
    return(
        <div className={styles['user-group']}>
            <p className={styles['group-title']}>
                Speakers — {users.length}
            </p>
            <div className={styles['user-container']}>
                {users.map(user => (
                    <RoomUser 
                        displayName={user.displayName || ''}
                        photoURL={user.photoURL || ''}
                        uid={user.uid}
                        key={user.uid}
                    />
                ))}
            </div>
        </div>
    )
}