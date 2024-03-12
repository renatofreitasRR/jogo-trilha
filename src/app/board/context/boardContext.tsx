import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { DotType } from '../interfaces/dot_type';

import dots_json from "../../../../data/data.json";
import combinations_json from "../../../../data/combinations.json";
import { LayerCombinationsType } from '../interfaces/dot_combination_type';

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
    const [layersCombinations, setLayersCombinations] = useState<LayerCombinationsType[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(2);
    const [playerOneDots, setPlayerOneDots] = useState<string[]>([]);
    const [playerTwoDots, setPlayerTwoDots] = useState<string[]>([]);
    const [currentDotClicked, setCurrentDotClicked] = useState<string | undefined>(undefined);
    const [level, setLevels] = useState<1 | 2 | 3>(1);

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

    function resetDots() {
        setBoardDots(prevDots => {
            return prevDots.map(dot => {
                return { ...dot, blink_dot: false };
            });
        });
    }

    function getDot(dot_id: string): DotType {
        const dot = boardDots.find(dot => dot.id == dot_id);

        return dot as DotType;
    }

    function blinkNeighbourhoods(dotClicked: DotType) {
        if (dotClicked?.has_piece) {
            dotClicked.can_join.map(neighbourhood_id => {
                const dotNeighbourhood = getDot(neighbourhood_id.toString());
                if (!dotNeighbourhood.hasOwnProperty('has_piece') || dotNeighbourhood.has_piece === false) {
                    setBoardDots(prevDots => {
                        return prevDots.map(dot => {
                            if (dot.id === dotNeighbourhood.id) {
                                return { ...dot, blink_dot: true };
                            } else {
                                return dot;
                            }
                        });
                    });
                }
            })
        }
    }

    function moveDot(move_to_dot: DotType) {
        const last_dot = getDot(currentDotClicked as string);

        setBoardDots(prevDots => {
            return prevDots.map(dot => {
                if (dot.id === last_dot.id) {
                    return { ...dot, has_piece: false };
                } else {
                    return dot;
                }
            });
        });

        setBoardDots(prevDots => {
            return prevDots.map(dot => {
                if (dot.id === move_to_dot.id) {
                    return { ...dot, has_piece: true, player: currentPlayer, blink_dot: false };
                } else {
                    return dot;
                }
            });
        });
    }



    function clickInDot(dot_id: string) {

        const dotClicked = getDot(dot_id);

        if (dotClicked?.has_piece) {
            setCurrentDotClicked(dot_id);
            blinkNeighbourhoods(dotClicked);
            return;
        }

        if (level === 2) {
            if ((
                !dotClicked.hasOwnProperty('has_piece') || dotClicked?.has_piece === false)
                && dotClicked.blink_dot === true) {

                moveDot(dotClicked);
                resetDots();
                return;

            }
        }


        const isPlayerOne = currentPlayer === 1;

        if (isPlayerOne && playerOneDots.length >= 9)
            return;

        if (isPlayerOne === false && playerTwoDots.length >= 9)
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