import React from 'react';
import styles from '../../styles/Room.module.scss';
import { RoomControls } from './RoomControls';
import { RoomHeader } from './RoomHeader';
import { RoomUsers } from './RoomUsers';

export const RoomMain = () => {
    return(
        <div className={styles['main']}>
            <RoomHeader />
            <RoomUsers />
            <RoomControls />
        </div>
    )
}