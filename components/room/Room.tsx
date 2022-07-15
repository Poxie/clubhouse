import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux/store';
import { selectUser } from '../../redux/user/hooks';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';

const db = firebase.firestore();

export const Room = () => {
    const { roomId } = useRouter().query as { roomId: string };
    const user = useAppSelector(selectUser);
    const roomRef = db.collection('rooms').doc(roomId);
    const usersRef = roomRef.collection('users').limit(100);
    const [users] = useCollectionData(usersRef as any);
    
    useEffect(() => {
        if(!user?.uid) return;

        // Handling joining room
        let userId: string;
        const init = async () => {
            // Fetch room data
            const roomRef = db.collection('rooms').doc(roomId);
            const roomData = await roomRef.get();

            // If room does not exist, create one
            let userRef;
            if(!roomData.exists) {
                const roomData = {
                    createdAt: Date.now(),
                    name: roomId,
                    description: null,
                    tags: []
                }
                roomRef.set(roomData);
                userRef = await roomRef.collection('users').add({
                    ...user,
                    owner: true
                });
                userId = userRef.id;
            } else {
                userRef = await roomRef.collection('users').add({
                    ...user,
                    owner: false
                });
                userId = userRef.id;
            }
        }
        init();
        
        // Leave room
        const leaveRoom = async () => {
            const userRef = roomRef.collection('users').doc(userId);
            await userRef.delete();
        }

        // Checking if room is empty
        roomRef.collection('users').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(async change => {
                if(change.type === 'removed' && snapshot.empty) {
                    await roomRef.delete();
                }
            })
        })

        // Handling leaving room
        window.addEventListener('beforeunload', leaveRoom);
        return () => {
            window.removeEventListener('beforeunload', leaveRoom);
            leaveRoom();
        }
    }, [roomId, user?.uid]);

    const logout = () => {
        getAuth().signOut();
    }
    return(
        <div>
            room {roomId}
            {users?.map(user => {
                return(
                    <>
                    <br />
                    {user.email}
                    </>
                )})
            }
            <div onClick={logout}>
                logout
            </div>
            <Link href={'/rooms/hello3'}>
            bye
            </Link>
        </div>
    )
}