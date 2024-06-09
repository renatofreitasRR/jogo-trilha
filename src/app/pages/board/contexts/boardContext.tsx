import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { DotType } from '../interfaces/dotType';
import dots_json from "../../../../../data/data.json";
import { GameRules } from '../services/gameRules';
import { GamePoints } from '../services/gamePoints';
import { useCountdown } from '../hooks/useCountdown';
import { GameAudio } from '../services/gameSounds';

interface BoardContextProps {
    resetTimer: () => void;
    changeTurn: () => void;
    clickInDot: (dot_id: string) => void;
    boardDots: DotType[];
    playerTurn: 1 | 2;
    playerWin: 1 | 2 | undefined;
    playerOneChipsAvailables: number;
    playerTwoChipsAvailables: number;
    gameOver: boolean;
    turnTime: number;
}

export const BoardContext = createContext({} as BoardContextProps);

interface BoardProviderProps {
    children: ReactNode;

}

export function BoardProvider({ children }: BoardProviderProps) {
    const [boardDots, setBoardDots] = useState<DotType[]>([]);
    const [playerWin, setPlayerWin] = useState<1 | 2 | undefined>(undefined);
    const [currentDotClicked, setCurrentDotClicked] = useState<string | undefined>(undefined);
    const [level, setLevels] = useState<1 | 2 | 3>(1);
    const [playerOneChipsAvailables, setPlayerOneChipsAvailables] = useState(9);
    const [playerTwoChipsAvailables, setPlayerTwoChipsAvailables] = useState(9);
    const [playerTurn, setPlayerTurn] = useState<1 | 2>(1);
    const [eatTime, setEatTime] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const { resetTimer, seconds } = useCountdown(changeTurn);
    const audio = new GameAudio();

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

    function resetAll() {
        loadDots();
        setPlayerOneChipsAvailables(9);
        setPlayerTwoChipsAvailables(9);
        setEatTime(false);
        setLevels(1);
        setCurrentDotClicked(undefined);
        setPlayerWin(undefined);
        setPlayerTurn(1);
        setGameOver(false);
    }

    function resetBlink(current_dots: DotType[]): DotType[] {
        const result = current_dots.map(dot => {
            return { ...dot, blink_dot: false };
        });

        return result;
    }

    function getDot(dot_id: string, currentDots: DotType[]): DotType {
        const dot = currentDots.find(dot => dot.id == dot_id);

        return dot as DotType;
    }

    function changeTurn() {
        if (playerTurn == 1)
            setPlayerTurn(2);
        else
            setPlayerTurn(1);

        resetTimer();
    }

    function blinkNeighbourhoods(dotClicked: DotType, currentDots: DotType[]): DotType[] {
        let dots = currentDots;
        if (dotClicked?.has_piece) {
            dotClicked.can_join.map(neighbourhood_id => {
                const dotNeighbourhood = getDot(neighbourhood_id.toString(), currentDots);
                if (!dotNeighbourhood.hasOwnProperty('has_piece') || dotNeighbourhood.has_piece === false) {
                    dots = dots.map(dot => {
                        if (dot.id === dotNeighbourhood.id) {
                            return { ...dot, blink_dot: true };
                        } else {
                            return dot;
                        }
                    });
                }
            })
        }
        return dots;
    }

    function blinkDotsToEat(player: 1 | 2, currentDots: DotType[]): DotType[] {
        const gamePoints = new GamePoints();

        const playerEnemy = player == 1 ? 2 : 1;

        // if (gamePoints.allEnemyDotsIsInARowCombination(player, currentDots, getDot))
        //     return blinkAllEnemyDots(player, currentDots);

        return currentDots.map(dot_prev => {
            const dotIsInRow = gamePoints.dotToEatIsInARowCombination(dot_prev, currentDots, getDot);

            if (dotIsInRow === false && dot_prev.has_piece === true && dot_prev.player == playerEnemy) {
                return { ...dot_prev, blink_dot: true };
            } else {
                return dot_prev;
            }
        });
    }

    function blinkAllEnemyDots(player: 1 | 2, currentDots: DotType[]): DotType[] {

        const playerEnemy = player == 1 ? 2 : 1;

        return currentDots.map(dot_prev => {
            if (dot_prev.player == playerEnemy) {
                return { ...dot_prev, blink_dot: true };
            } else {
                return dot_prev;
            }
        });
    }

    function moveDot(move_to_dot: DotType, currentDots: DotType[]): DotType[] {
        const last_dot = getDot(currentDotClicked as string, currentDots);
        let dots = currentDots;

        dots = dots.map(dot => {
            if (dot.id === last_dot.id) {
                return { ...dot, has_piece: false, player: undefined };
            } else {
                return dot;
            }
        });

        dots = dots.map(dot => {
            if (dot.id === move_to_dot.id) {
                return { ...dot, has_piece: true, player: playerTurn, blink_dot: false };
            } else {
                return dot;
            }
        });

        return dots;
    }

    function eatDot(dot_to_eat: DotType, current_dots: DotType[]): DotType[] {

        const result = current_dots.map(dot => {
            if (dot.id === dot_to_eat.id) {
                return { ...dot, has_piece: false, player: undefined };
            } else {
                return dot;
            }
        });

        audio.eatAudio();

        return result;
    }


    function clickInDot(dot_id: string) {
        let currentDots = boardDots;
        let currentEatTime = eatTime;


        const dotClicked = getDot(dot_id, currentDots);
        const gamePoints = new GamePoints();

        if (currentEatTime && (gamePoints.hasPlayerEnemyDotsToEat(currentEatTime, currentDots, playerTurn) === false)) {
            currentEatTime = false;
        }

        if (GameRules.canEat(currentEatTime, playerTurn, dotClicked)) {

            currentDots = eatDot(dotClicked, currentDots);
            currentDots = resetBlink(currentDots);
            setBoardDots(currentDots);

            if (level == 2 && gamePoints.gameOver(playerTurn, currentDots)) {
                setGameOver(true);
                setPlayerWin(playerTurn);
                alert(`Fim de Jogo, vitória do jogador ${playerTurn}`);

                resetAll();

                return;
            }

            setEatTime(false);
            changeTurn();
            return;
        }


        if (GameRules.canChangeToLevelTwo(playerOneChipsAvailables, playerTwoChipsAvailables, level))
            setLevels(2);

        if (level === 2) {

            if (GameRules.canBlink(dotClicked, playerTurn)) {

                currentDots = resetBlink(currentDots);
                currentDots = blinkNeighbourhoods(dotClicked, currentDots);

                setCurrentDotClicked(dot_id);
                setBoardDots(currentDots);
                setEatTime(currentEatTime);

                return;
            }

            if (GameRules.canMove(dotClicked, level)) {

                currentDots = moveDot(dotClicked, currentDots);

                if (gamePoints.rowCombined(dotClicked, playerTurn, currentDots, getDot)) {
                    currentDots = resetBlink(currentDots);
                    currentDots = blinkDotsToEat(playerTurn, currentDots);

                    setEatTime(true);
                    setBoardDots(currentDots);

                    return;
                }

                currentDots = resetBlink(currentDots);
                changeTurn();

                setBoardDots(currentDots);
                setEatTime(currentEatTime);

                audio.moveAudio();

                return;

            }
        }

        //LVL 1

        if (GameRules.canPutDot(playerTurn, dotClicked, playerOneChipsAvailables, playerTwoChipsAvailables, currentEatTime) === false)
            return;

        const isPlayerOne = playerTurn === 1;

        if (isPlayerOne) {
            setPlayerOneChipsAvailables(playerOneChipsAvailables - 1);
        }
        else {
            setPlayerTwoChipsAvailables(playerTwoChipsAvailables - 1);
        }

        currentDots = currentDots.map(dot => {
            if (dot.id === dot_id) {
                return { ...dot, has_piece: true, player: playerTurn };
            } else {
                return dot;
            }
        });

        if (gamePoints.rowCombined(dotClicked, playerTurn, currentDots, getDot)) {

            currentDots = blinkDotsToEat(playerTurn, currentDots);

            setEatTime(true);
            setBoardDots(currentDots);

            return;
        }

        changeTurn();
        setBoardDots(currentDots);

        audio.clickAudio();
    }

    useEffect(() => {
        loadDots();
    }, []);

    return (
        <BoardContext.Provider
            value={
                {
                    playerOneChipsAvailables,
                    playerTwoChipsAvailables,
                    boardDots,
                    playerTurn,
                    gameOver,
                    playerWin,
                    turnTime: seconds,
                    clickInDot,
                    changeTurn,
                    resetTimer
                }}>
            {children}
        </BoardContext.Provider>
    );
}