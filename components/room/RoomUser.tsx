import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useConnection } from '../../contexts/ConnectionProvider';
import styles from '../../styles/Room.module.scss';
import hark from 'hark';
import { useAppSelector } from '../../redux/store';
import { selectUserId } from '../../redux/user/hooks';
import { selectRoomUser } from '../../redux/room/hooks';

export const RoomUser: React.FC<{
    uid: string;
}> = ({ uid }) => {
    const userId = useAppSelector(selectUserId);
    const isMe = userId === uid;
    const user = useAppSelector(state => selectRoomUser(state, uid));
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
    
    // Getting info from user
    if(!user) return null;
    const { displayName, photoURL } = user;

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