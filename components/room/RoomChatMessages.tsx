import React, { useEffect, useRef } from 'react';
import { selectRoomMessageIds } from '../../redux/room/hooks';
import { useAppSelector } from '../../redux/store';
import styles from '../../styles/Room.module.scss';
import { RoomChatMessage } from './RoomChatMessage';

export const RoomChatMessages = () => {
    const messageIds = useAppSelector(selectRoomMessageIds);
    const container = useRef<HTMLDivElement>(null);

    // Updating scroll on new messages
    useEffect(() => {
        if(!container.current) return;
        container.current.scrollTo({ top: container.current.getBoundingClientRect().height });
    }, [messageIds.length]);

    return(
        <div className={styles['chat-messages']}>
            <div className={styles['chat-message-container']} ref={container}>
                {messageIds.map(id => <RoomChatMessage id={id} key={id} />)}
                
                {!messageIds.length && (
                    <span className={styles['messages-empty']}>
                        There are no messages here yet.
                    </span>
                )}
            </div>
        </div>
    )
}