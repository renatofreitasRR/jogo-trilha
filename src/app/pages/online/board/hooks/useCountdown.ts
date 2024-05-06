import { useContext, useEffect, useState } from 'react';
import { BoardContext } from '../contexts/boardContext';

const useCountdown = (changeTurn: () => void) => {
    const [countDown, setCountDown] = useState(15);


    useEffect(() => {
        if (countDown <= 0) {
            resetTimer();
            // changeTurn();
        }
        else {
            const interval = setInterval(() => {
                setCountDown(countDown - 1);
            }, 1000);

            return () => clearInterval(interval);
        }

    }, [countDown]);

    function resetTimer() {
        setCountDown(15);
    }

    return { seconds: countDown, resetTimer: resetTimer };
};

export { useCountdown };
