"use client"

import { useEffect, useState } from 'react';

const useAudio = () => {
    const [clickAudio, setClickAudio] = useState<any>(null);
    const [blockAudio, setBlockAudio] = useState<any>(null);
    const [eatAudio, setEatAudio] = useState<any>(null);
    const [winAudio, setWinAudio] = useState<any>(null);
    const [loseAudio, setLoseAudio] = useState<any>(null);
    const [moveAudio, setMoveAudio] = useState<any>(null);

    useEffect(() => {
        setClickAudio(new Audio('/sounds/click.mp3'));
        setBlockAudio(new Audio('/sounds/block.mp3'));
        setEatAudio(new Audio('/sounds/eat.mp3'));
        setWinAudio(new Audio('/sounds/win.mp3'));
        setLoseAudio(new Audio('/sounds/lose.mp3'));
        setMoveAudio(new Audio('/sounds/move.mp3'));
    }, [])

    function playClickAudio() {
        clickAudio.play()
    }

    function playBlockAudio() {
        blockAudio.play()
    }

    function playEatAudio() {
        eatAudio.play()
    }

    function playWinAudio() {
        winAudio.play()
    }

    function playLoseAudio() {
        loseAudio.play()
    }

    function playMoveAudio() {
        moveAudio.play()
    }



    return { playBlockAudio, playClickAudio, playEatAudio, playLoseAudio, playMoveAudio, playWinAudio };
};

export { useAudio };
