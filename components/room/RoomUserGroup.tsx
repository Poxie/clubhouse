import React from 'react';
import styles from '../../styles/Room.module.scss';
import { RoomUser } from './RoomUser';

export const RoomUserGroup: React.FC<{
    userIds: string[];
    label: string;
}> = ({ userIds, label }) => {
    return(
        <div className={styles['user-group']}>
            <p className={styles['group-title']}>
                {label} — {userIds.length}
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