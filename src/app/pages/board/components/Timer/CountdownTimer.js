import React from 'react';
import { useCountdown } from '../../hooks/useCountdown.js';
import DateTimeDisplay from './DateTimeDisplay.js';
import styles from './index.module.css'

const ShowCounter = ({ seconds }) => {
    return (
        <div className={styles.show_counter}>
            <DateTimeDisplay value={seconds} type={'s'} />
        </div>
    );
};

export const CountdownTimer = ({ targetDate }) => {
    const [seconds] = useCountdown(targetDate);

    if (seconds <= 0) {
        //se os segundos se esgotaram...

        //ToDo: implementar virar turno
        //ToDo: avaliar mostrar algo quando esgotar o tempo?
    } else {
        //ainda tem tempo
        return (
            <ShowCounter
                seconds={seconds}
            />
        );
    }
};
