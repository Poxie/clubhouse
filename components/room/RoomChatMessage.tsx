import Image from 'next/image';
import React from 'react';
import styles from '../../styles/Room.module.scss';
import { selectRoomMessage } from '../../redux/room/hooks';
import { useAppSelector } from '../../redux/store';

export const RoomChatMessage: React.FC<{
    id: string;
}> = ({ id }) => {
    const messageObject = useAppSelector(state => selectRoomMessage(state, id));
    if(!messageObject) return null;
    
    const { message, author } = messageObject;
    return(
        <div className={styles['message']}>
            <div className={styles['author-icon']}>
                <Image 
                    src={author.photoURL || ''}
                    layout={'fill'}
                />
            </div>
            <div className={styles['message-main']}>
                <span className={styles['author-name']}>
                    {author.displayName}
                </span>
                {message}
            </div>
        </div>
    )
}