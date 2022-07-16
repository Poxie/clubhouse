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
import { HandIcon } from '../../assets/icons/HandIcon';

const db = firebase.firestore();
export const RoomControls: React.FC<{
    toggleRequestToSpeakModal: (state: boolean) => void;
    hasRequestToSpeakModal: boolean;
}> = ({ toggleRequestToSpeakModal, hasRequestToSpeakModal }) => {
    const { roomId } = useRouter().query as { roomId: string };
    const userId = useAppSelector(selectUserId);
    const user = useAppSelector(state => selectRoomUser(state, userId || ''));
    const userRef = db.collection('rooms').doc(roomId).collection('users').doc(userId);
    if(!user) return null;

    // Getting user states
    let { owner, muted, deafened, speaker, requestToSpeak: hasRequestedToSpeak } = user;

    // Muting yourself
    const mute = (muted: boolean) => {
        deafened = (deafened || false) && muted;
        userRef.update({ muted, deafened });
    }
    // Deafeaning yourself
    const deafen = (deafened: boolean) => {
        userRef.update({ deafened, muted: deafened });
    }
    // Requesting to speak
    const requestToSpeak = (state: boolean) => {
        userRef.update({ requestToSpeak: state });
    }
    return(
        <div className={styles['controls']}>
            {speaker && (
                <RoomControl 
                    active={muted} 
                    onChange={mute}
                >
                    {muted ? <MutedIcon /> : <MicIcon />}
                </RoomControl>
            )}
            <RoomControl
                active={deafened}
                onChange={deafen}
            >
                {deafened ? <DeafenedIcon /> : <HeadphonesIcon />}
            </RoomControl>
            {(owner || !speaker) && (
                <RoomControl 
                    active={hasRequestedToSpeak || hasRequestToSpeakModal} 
                    onChange={owner ? toggleRequestToSpeakModal : requestToSpeak }
                >
                    <HandIcon />
                </RoomControl>
            )}
        </div>
    )
}