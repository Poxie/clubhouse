import React from 'react';
import { Room } from '../../components/room/Room';
import { ConnectionProvider } from '../../contexts/ConnectionProvider';

export default function room() {
    return(
        <ConnectionProvider>
            <Room />
        </ConnectionProvider>
    );
}