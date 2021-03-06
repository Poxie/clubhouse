import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/compat/app';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectUser } from '../redux/user/hooks';
import { addRoomMessage, setRoomInfo, setRoomMessages, setRoomUsers } from '../redux/room/actions';
import { User } from '../redux/user/types';
import { Message, RoomInfo } from '../redux/room/types';

type ConnectionContextType = {
    localStream: MediaStream | null;
    remoteStreams: {[id: string]: MediaStream}
}
const ConnectionContext = React.createContext({} as ConnectionContextType);

export const useConnection = () => React.useContext(ConnectionContext);

export const ConnectionProvider: React.FC<{children: ReactElement}> = ({ children }) => {
    const db = firebase.firestore();
    const { roomId } = useRouter().query as { roomId: string };
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const [localStream, setLocalStream] = useState<null | MediaStream>(null);
    const [remoteStreams, setRemoteStreams] = useState<{[id: string]: MediaStream}>({})

    useEffect(() => {
        if(!user?.uid) return;
        const roomRef = db.collection('rooms').doc(roomId);
        const usersRef = roomRef.collection('users');
        const messagesRef = roomRef.collection('messages');

        const Peer = require('peerjs').default;
        const peer = new Peer(user?.uid, {
            host: process.env.NEXT_PUBLIC_PEER_HOST,
            port: parseInt(process.env.NEXT_PUBLIC_PEER_PORT),
            path: process.env.NEXT_PUBLIC_PEER_PATH
        });

        peer.on('open', async id => {
            // If room does not exist, create one
            let roomData = await roomRef.get();
            let userData = {...user, owner: false, speaker: false};
            if(!roomData.exists) {
                const roomInfo = {
                    name: roomId,
                    description: null,
                    createdAt: Date.now()
                };
                roomRef.set(roomInfo);
                userData = {
                    ...userData,
                    owner: true,
                    speaker: true
                }
            }
            await usersRef.doc(user?.uid).set(userData);
            
            // Updating redux room state
            dispatch(setRoomInfo(roomData.data() as any));

            // Getting room users
            const getRoomUsers = async () => {
                const users: User[] = [];
                (await usersRef.get()).forEach(user => users.push(user.data() as User));
                dispatch(setRoomUsers(users));

                // Updating users state on snapshot change
                usersRef.onSnapshot(snapshot => {
                    const users = snapshot.docs.map(doc => doc.data() as User);
                    dispatch(setRoomUsers(users));
                })
            }
            getRoomUsers();

            // Getting room messages
            const getRoomMessages = async () => {
                // Updating messages state on snapshot change
                messagesRef.onSnapshot(snapshot => {
                    snapshot.docChanges().forEach(change => {
                        if(change.type === 'added') {
                            dispatch(addRoomMessage(change.doc.data() as Message));
                        }
                    })
                })
            }
            getRoomMessages();

            // Updating on room info update
            const getRoomInfoUpdates = async () => {
                roomRef.onSnapshot(snapshot => {
                    const data = snapshot.data();
                    dispatch(setRoomInfo(data as RoomInfo));
                })
            }
            getRoomInfoUpdates();
        })

        // Creating local media stream
        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
            setLocalStream(stream);

            // Listening for events to update audio
            usersRef.doc(user?.uid).onSnapshot(snaphot => {
                const data = snaphot.data() as User;
                if(!data) return;

                // Updating muted state for user
                if(data.muted || !data.speaker) {
                    stream.getAudioTracks().forEach(track => track.enabled = false);
                } else {
                    stream.getAudioTracks().forEach(track => track.enabled = true);
                }
                // Updating deafen state for user
                if(data.deafened) {
                    setRemoteStreams(streams => {
                        Object.values(streams).forEach(stream => {
                            stream.getAudioTracks().forEach(track => track.enabled = false);
                            stream.getAudioTracks().forEach(track => console.log(track.enabled));
                        })
                        return streams;
                    })
                } else {
                    setRemoteStreams(streams => {
                        Object.values(streams).forEach(stream => {
                            stream.getAudioTracks().forEach(track => track.enabled = true);
                        });
                        return streams;
                    })
                }
            })

            peer.on('call', call => {
                if(call.peer === user?.uid) return;

                // Answering calling user
                call.answer(stream);

                // Creating user audio
                const audio = document.createElement('audio');
                audio.setAttribute('data-user-id', call.peer);
                audio.autoplay = true;
                call.on('stream', remoteStream => {
                    audio.srcObject = remoteStream;
                    if(document.body.querySelector(`[data-user-id="${call.peer}"]`)) return;

                    document.body.append(audio);
                    
                    // Updating remote streams
                    setRemoteStreams(prev => ({
                        ...prev,
                        [call.peer]: remoteStream
                    }))
                });
                
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
            peer.call(id, stream);
        }

        // Leaving room
        const leaveRoom = async () => {
            usersRef.doc(user?.uid).delete();
            peer.destroy();
            document.querySelectorAll('audio').forEach(element => element.remove());

            // If room is empty, destroy room
            const userLength = (await usersRef.get()).docs.length;
            if(userLength <= 0) {
                await roomRef.delete();
            }
        }

        // Handling user leaving room
        window.addEventListener('beforeunload', leaveRoom);
        return () => {
            window.removeEventListener('beforeunload', leaveRoom);
            leaveRoom();
        }
    }, [user?.uid, roomId]);

    const value = {
        localStream,
        remoteStreams
    }
    return(
        <ConnectionContext.Provider value={value}>
            {children}
        </ConnectionContext.Provider>
    )
}