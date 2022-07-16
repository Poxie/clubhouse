import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useConnection } from '../../contexts/ConnectionProvider';
import styles from '../../styles/Room.module.scss';
import hark from 'hark';

export const RoomUser: React.FC<{
    uid: string;
    displayName: string;
    photoURL: string;
}> = ({ uid, displayName, photoURL }) => {
    const [talking, setTalking] = useState(false);
    const { remoteStreams } = useConnection();
    const remoteStream = remoteStreams[uid];

    // Determining if user is speaking
    useEffect(() => {
        if(!remoteStream) return;

        const speechEvents = hark(remoteStream);

        speechEvents.on('speaking', () => setTalking(true));
        speechEvents.on('stopped_speaking', () => setTalking(false));
    }, [remoteStream]);
    
    const iconClassName = [
        styles['user-icon'],
        talking ? styles['talking'] : ''
    ].join(' ');
    return(
        <div className={styles['user']}>
            <div className={iconClassName}>
                <Image 
                    src={photoURL}
                    layout={'fill'}
                />
            </div>
            {displayName}
        </div>
    )
}