import React from 'react';
import styles from '../../styles/Room.module.scss';
import { selectRoomHeader } from '../../redux/room/hooks';
import { useAppSelector } from '../../redux/store';

export const RoomHeader = () => {
    const { name, description } = useAppSelector(selectRoomHeader);
    return(
        <div className={styles['header']}>
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