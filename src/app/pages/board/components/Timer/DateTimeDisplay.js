import React from 'react';
import styles from './index.module.css'

const DateTimeDisplay = ({ value, type }) => {
    return (
        <div className={styles.show_counter}>
            <p>{value}</p>
            <span>{type}</span>
        </div>
    );
};

export default DateTimeDisplay;
