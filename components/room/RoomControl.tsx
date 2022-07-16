import React from 'react';
import styles from '../../styles/Room.module.scss';
import { ReactElement } from 'react';

export const RoomControl: React.FC<{
    active: boolean;
    onChange: (state: boolean) => void;
    children: ReactElement;
}> = ({ active, onChange, children }) => {
    const className = [
        styles['control-button'],
        active ? styles['active'] : ''
    ].join(' ');
    return(
        <div 
            className={className}
            onClick={() => onChange(!active)}
        >
            {children}
        </div>
    )
}