import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Room = () => {
    const { roomId } = useRouter().query as { roomId: string };

    return(
        <div>
            room {roomId}
            <Link href={'/rooms/hello3'}>
            bye
            </Link>
        </div>
    )
}