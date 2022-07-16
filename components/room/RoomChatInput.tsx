import React, { useState } from 'react';
import firebase from 'firebase/compat/app'
import styles from '../../styles/Room.module.scss';
import { selectRoomHeader } from '../../redux/room/hooks';
import { useAppSelector } from '../../redux/store';
import { useRouter } from 'next/router';
import { selectUser } from '../../redux/user/hooks';
import { SendIcon } from '../../assets/icons/SendIcon';

const db = firebase.firestore();
export const RoomChatInput = () => {
    const user = useAppSelector(selectUser);
    const { roomId } = useRouter().query as { roomId: string };
    const roomHeader = useAppSelector(selectRoomHeader);
    const [value, setValue] = useState('');

    // Sending message
    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        // Adding message to database
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: value,
            author: user,
            createdAt: Date.now(),
            id: Math.random()
        });

        setValue('');
    }

    return(
        <form onSubmit={sendMessage}>
            <input 
                type="text"
                value={value}
                placeholder={`Message ${roomHeader.name}`}
                className={styles['chat-input']}
                onChange={e => setValue(e.target.value)}
            />
            <button 
                type={'submit'} 
                className={styles['chat-button']}
            >
                Send <SendIcon />
            </button>
        </form>
    )
}