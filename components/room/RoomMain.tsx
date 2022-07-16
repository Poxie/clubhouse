import React, { useState } from 'react';
import styles from '../../styles/Room.module.scss';
import { RoomControls } from './RoomControls';
import { RoomHeader } from './RoomHeader';
import { RoomRequestToSpeak } from './RoomRequestToSpeak';
import { RoomUsers } from './RoomUsers';

export const RoomMain = () => {
    const [requestToSpeak, setRequestToSpeak] = useState(false);
    return(
        <div className={styles['main']}>
            <div className={styles['main-view']}>
                <RoomHeader />
                <RoomUsers />
                <RoomControls 
                    toggleRequestToSpeakModal={setRequestToSpeak}
                    hasRequestToSpeakModal={requestToSpeak}
                />
            </div>

            {requestToSpeak && (
                <RoomRequestToSpeak />
            )}
        </div>
    )
}