import React, { useEffect, useState } from 'react';
import styles from '../../styles/Room.module.scss';
import { RoomChat } from './RoomChat';
import { RoomMain } from './RoomMain';

export const Room = () => {
    return(
        <div className={styles['container']}>
            <RoomMain />
            <RoomChat />
        </div>
    )
}