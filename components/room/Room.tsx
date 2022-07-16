import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux/store';
import { selectUser } from '../../redux/user/hooks';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const db = firebase.firestore();

export const Room = () => {
    const { roomId } = useRouter().query as { roomId: string };
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if(!user?.uid) return;
        const roomRef = db.collection('rooms').doc(roomId);
        const usersRef = roomRef.collection('users');

        const Peer = require('peerjs').default;
        const peer = new Peer(user?.uid, {
            host: process.env.NEXT_PUBLIC_PEER_HOST,
            port: parseInt(process.env.NEXT_PUBLIC_PEER_PORT),
            path: process.env.NEXT_PUBLIC_PEER_PATH
        });

        peer.on('open', async id => {
            // If room does not exist, create one
            if(!(await roomRef.get()).exists) {
                const roomInfo = {
                    name: roomId,
                    description: null,
                    createdAt: Date.now()
                };
                roomRef.set(roomInfo);
            }
            await usersRef.doc(user?.uid).set(user);
        })

        // Creating local media stream
        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
            peer.on('call', call => {
                if(call.peer === user?.uid) return;

                // Answering calling user
                call.answer(stream);

                // Creating user audio
                const audio = document.createElement('audio');
                audio.autoplay = true;
                call.on('stream', remoteStream => {
                    console.log('hey');
                    audio.srcObject = remoteStream;
                    document.body.append(audio);
                })
                
                // Checking if call is disconnected
                usersRef.onSnapshot(snapshot => {
                    snapshot.docChanges().forEach(change => {
                        if(change.type === 'removed') {
                            const id = change.doc.data()?.uid;
                            if(id === call.peer) {
                                audio.remove();
                            }
                        }
                    })
                })
            })

            // Checking for user collection changes
            usersRef.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added') {
                        connectToUser(change.doc.data()?.uid, stream);
                    }
                })
            })
        })

        // Connecting to users
        const connectToUser = (id: string, stream: MediaStream) => {
            if(id === user?.uid) return;

            // Calling user
            const call = peer.call(id, stream);
            if(!call) return;

            // Creating audio stream on new stream
            const audio = document.createElement('audio');
            audio.autoplay = true;
            call.on('stream', stream => {
                audio.srcObject = stream;
                document.body.append(audio);
            })

            // Checking if call is disconnected
            usersRef.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'removed') {
                        const id = change.doc.data()?.uid;
                        if(id === call.peer) {
                            audio.remove();
                        }
                    }
                })
            })
        }

        // Leaving room
        const leaveRoom = () => {
            usersRef.doc(user?.uid).delete();
            peer.destroy();
            document.querySelectorAll('audio').forEach(element => element.remove());
        }

        // Handling user leaving room
        window.addEventListener('beforeunload', leaveRoom);
        return () => {
            window.removeEventListener('beforeunload', leaveRoom);
            leaveRoom();
        }
    }, [user?.uid, roomId]);

    const logout = () => {
        getAuth().signOut();
    }
    return(
        <div>
            room {roomId}
            <div onClick={logout}>
                logout
            </div>
            <Link href={'/rooms/hello3'}>
            bye
            </Link>
        </div>
    )
}