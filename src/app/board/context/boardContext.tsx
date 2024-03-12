import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { DotType } from '../interfaces/dot_type';

import dots_json from "../../../../data/data.json";

interface BoardContextProps {
    boardDots: DotType[];
    clickInDot: (dot_id: string) => void;
    currentPlayer: 1 | 2;
}

export const BoardContext = createContext({} as BoardContextProps);

interface BoardProviderProps {
    children: ReactNode;

}

export function BoardProvider({ children }: BoardProviderProps) {
    const [boardDots, setBoardDots] = useState<DotType[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(2);
    const [playerOneDots, setPlayerOneDots] = useState<string[]>([]);
    const [playerTwoDots, setPlayerTwoDots] = useState<string[]>([]);

    function loadDots() {
        const dots_data = dots_json;

        const dots_in_layer_1_array: any[] = Object.entries(dots_data)
            .filter(([key, value]) => value.layers.includes(1))
            .map(([key, value]) => ({ id: key, main_layer: 1, ...value }));

        const dots_in_layer_2_array: any[] = Object.entries(dots_data)
            .filter(([key, value]) => value.layers.includes(2))
            .map(([key, value]) => ({ id: key, main_layer: 2, ...value }));

        const dots_in_layer_3_array: any[] = Object.entries(dots_data)
            .filter(([key, value]) => value.layers.includes(3))
            .map(([key, value]) => ({ id: key, main_layer: 3, ...value }));

        const arrays_joined = dots_in_layer_1_array
            .concat(dots_in_layer_2_array)
            .concat(dots_in_layer_3_array)

        setBoardDots(arrays_joined);
    }

    function clickInDot(dot_id: string) {

        const isPlayerOne = currentPlayer === 1;

        if (isPlayerOne && playerOneDots.length >= 9)
            return;

        if (!isPlayerOne && playerTwoDots.length >= 9)
            return;

        if (isPlayerOne)
            setPlayerOneDots(prevDots => [...prevDots, dot_id])
        else
            setPlayerTwoDots(prevDots => [...prevDots, dot_id])

        setBoardDots(prevDots => {
            return prevDots.map(dot => {
                if (dot.id === dot_id && !dot.has_piece) {
                    return { ...dot, has_piece: true, player: currentPlayer };
                } else {
                    return dot;
                }
            });
        });

    }

    useEffect(() => {
        loadDots();
    }, []);

    return (
        <BoardContext.Provider
            value={
                {
                    boardDots,
                    currentPlayer,
                    clickInDot
                }}>
            {children}
        </BoardContext.Provider>
    );
}