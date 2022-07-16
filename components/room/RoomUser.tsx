import Image from 'next/image';
import React from 'react';
import styles from '../../styles/Room.module.scss';

export const RoomUser: React.FC<{
    uid: string;
    displayName: string;
    photoURL: string;
}> = ({ uid, displayName, photoURL }) => {
    return(
        <div className={styles['user']}>
            <div className={styles['user-icon']}>
                <Image 
                    src={photoURL}
                    layout={'fill'}
                />
            </div>
            {displayName}
        </div>
    )
}