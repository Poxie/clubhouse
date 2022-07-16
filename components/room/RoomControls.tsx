import React from 'react';
import firebase from 'firebase/compat/app';
import { MicIcon } from '../../assets/icons/MicIcon';
import { MutedIcon } from '../../assets/icons/MutedIcon';
import { selectRoomUser } from '../../redux/room/hooks';
import { useAppSelector } from '../../redux/store';
import { selectUserId } from '../../redux/user/hooks';
import styles from '../../styles/Room.module.scss';
import { RoomControl } from './RoomControl';
import { useRouter } from 'next/router';

const db = firebase.firestore();
export const RoomControls = () => {
    const { roomId } = useRouter().query as { roomId: string };
    const userId = useAppSelector(selectUserId);
    const user = useAppSelector(state => selectRoomUser(state, userId || ''));
    if(!user) return null;

    // Muting yourself
    const mute = (muted: boolean) => {
        db.collection('rooms').doc(roomId).collection('users').doc(userId).update({ muted });
    }

    const { muted } = user;
    return(
        <div className={styles['controls']}>
            <RoomControl 
                active={muted} 
                onChange={mute}
            >
                {muted ? <MutedIcon /> : <MicIcon />}
            </RoomControl>
        </div>
    )
}