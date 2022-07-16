import React from 'react';
import { selectRoomHeader } from '../../redux/room/hooks';
import { useAppSelector } from '../../redux/store';

export const RoomHeader = () => {
    const { name, description } = useAppSelector(selectRoomHeader);
    return(
        <div>
            <h1>
                {name}
            </h1>
            {description && (
                <span>
                    {description}
                </span>
            )}
        </div>
    )
}