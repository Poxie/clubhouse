import React from 'react';
import firebase from 'firebase/compat/app';
import styles from '../../styles/Room.module.scss';
import Image from 'next/image';
import { selectRoomUser } from '../../redux/room/hooks';
import { useAppSelector } from '../../redux/store';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { CheckIcon } from '../../assets/icons/CheckIcon';
import { useRouter } from 'next/router';

const db = firebase.firestore();
export const RoomRequestToSpeakUser: React.FC<{
    uid: string;
}> = ({ uid }) => {
    const { roomId } = useRouter().query as { roomId: string };
    const user = useAppSelector(state => selectRoomUser(state, uid));
    const userRef = db.collection('rooms').doc(roomId).collection('users').doc(uid);
    if(!user) return null;

    // Accept request
    const accept = () => {
        userRef.update({
            speaker: true,
            requestToSpeak: false
        })
    }
    // Decline request
    const decline = () => {
        userRef.update({
            requestToSpeak: false
        })
    }

    const { photoURL, displayName } = user;
    return(
        <div className={styles['request-to-speak-user']}>
            <div className={styles['request-to-speak-user-info']}>
                <div className={styles['request-to-speak-user-icon']}>
                    <Image 
                        src={photoURL || ''}
                        layout={'fill'}
                    />
                </div>
                {displayName}
            </div>

            <div className={styles['request-to-speak-options']}>
                <div onClick={decline}>
                    <CloseIcon />
                </div>
                <div onClick={accept}>
                    <CheckIcon />
                </div>
            </div>
        </div>
    )
}