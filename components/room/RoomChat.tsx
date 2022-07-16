import React from 'react';
import styles from '../../styles/Room.module.scss';
import { RoomChatInput } from './RoomChatInput';
import { RoomChatMessages } from './RoomChatMessages';

export const RoomChat = () => {
    return(
        <div className={styles['chat']}>
            <p className={styles['chat-header']}>
                Chat Messages
            </p>
            <RoomChatMessages />
            <RoomChatInput />
        </div>
    )
}