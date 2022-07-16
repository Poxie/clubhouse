import React from 'react';
import styles from '../../styles/Room.module.scss';

export const RoomChat = () => {
    return(
        <div className={styles['chat']}>
            <p className={styles['chat-header']}>
                Chat Messages
            </p>
        </div>
    )
}