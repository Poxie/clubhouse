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
import { HeadphonesIcon } from '../../assets/icons/HeadphonesIcon';
import { DeafenedIcon } from '../../assets/icons/DeafenedIcon';

const db = firebase.firestore();
export const RoomControls = () => {
    const { roomId } = useRouter().query as { roomId: string };
    const userId = useAppSelector(selectUserId);
    const user = useAppSelector(state => selectRoomUser(state, userId || ''));
    const userRef = db.collection('rooms').doc(roomId).collection('users').doc(userId);
    if(!user) return null;

    // Getting user states
    let { muted, deafened } = user;

    // Muting yourself
    const mute = (muted: boolean) => {
        deafened = (deafened || false) && muted;
        userRef.update({ muted, deafened });
    }
    // Deafeaning yourself
    const deafen = (deafened: boolean) => {
        userRef.update({ deafened, muted: deafened });
    }
    return(
        <div className={styles['controls']}>
            <RoomControl 
                active={muted} 
                onChange={mute}
            >
                {muted ? <MutedIcon /> : <MicIcon />}
            </RoomControl>
            <RoomControl
                active={deafened}
                onChange={deafen}
            >
                {deafened ? <DeafenedIcon /> : <HeadphonesIcon />}
            </RoomControl>
        </div>
    )
}