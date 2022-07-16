import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useConnection } from '../../contexts/ConnectionProvider';
import styles from '../../styles/Room.module.scss';
import hark from 'hark';
import { useAppSelector } from '../../redux/store';
import { selectUserId } from '../../redux/user/hooks';

export const RoomUser: React.FC<{
    uid: string;
    displayName: string;
    photoURL: string;
}> = ({ uid, displayName, photoURL }) => {
    const userId = useAppSelector(selectUserId);
    const isMe = userId === uid;
    const [talking, setTalking] = useState(false);
    const { remoteStreams, localStream } = useConnection();
    const remoteStream = remoteStreams[uid];

    // Determining if user is speaking
    useEffect(() => {
        const stream = isMe ? localStream : remoteStream;
        if(!stream) return;

        const speechEvents = hark(stream);

        speechEvents.on('speaking', () => setTalking(true));
        speechEvents.on('stopped_speaking', () => setTalking(false));
    }, [remoteStream, localStream, isMe]);
    
    const iconClassName = [
        styles['user-icon'],
        talking ? styles['talking'] : ''
    ].join(' ');
    const userClassName = [
        styles['user'],
        isMe ? styles['is-me'] : ''
    ].join(' ');
    return(
        <div className={userClassName}>
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