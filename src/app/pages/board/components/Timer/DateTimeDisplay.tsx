import React from 'react';
import styles from './index.module.css'

interface DateTimeDisplayProps {
    value: number;
    type: string;
}

const DateTimeDisplay = ({ value, type }: DateTimeDisplayProps) => {
    return (
        <div className={styles.show_counter}>
            <p>{value}</p>
            <span>{type}</span>
        </div>
    );
};

export default DateTimeDisplay;
