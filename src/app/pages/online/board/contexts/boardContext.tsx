import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { DotType } from '../interfaces/dotType';
import { GameRules } from '../services/gameRules';
import { GamePoints } from '../services/gamePoints';
import { useCountdown } from '../hooks/useCountdown';
import { WebSocketContext } from './webSocketContext';
import { Player } from '../interfaces/player';
import { useAudio } from '@/app/shared/hooks/useAudio';
import { api } from '@/app/services/api';

interface BoardContextProps {
    clickInDot: (dot_id: string) => void;
    boardDots: DotType[];
    playerTurn: string;
    playerWin: string | undefined;
    playerOneChipsAvailables: number;
    playerTwoChipsAvailables: number;
    gameOver: boolean;
    pacoteAtual: string;
}

export const BoardContext = createContext({} as BoardContextProps);

interface BoardProviderProps {
    children: ReactNode;

}

export function BoardProvider({ children }: BoardProviderProps) {
    const {
        sendMessage,
        loadDots,
        boardDots,
        playerTurn,
        firstPlayer,
        setPlayerTurn,
        secondPlayer,
        awaitTurn,
        canStart,
        connection,
        currentDotClicked,
        eatTime,
        gameOver,
        level,
        playerOneChipsAvailables,
        playerTwoChipsAvailables,
        setCurrentDotClicked,
        setEatTime,
        setGameOver,
        setLevels,
        setPlayerOneChipsAvailables,
        setPlayerTwoChipsAvailables,
        playerWin,
        setPlayerWin
    } = useContext(WebSocketContext);

    const { playBlockAudio, playClickAudio, playEatAudio, playLoseAudio, playMoveAudio, playWinAudio } = useAudio();

    var [pacotesDisponiveis, setPacotesDisponiveis] = useState(["jetsons", "flinstones", "scooby doo", "pacman"]); //Mockado
    var [pacoteAtual, setPacoteAtual] = useState("");

    useEffect(() => {
        const fetchPacoteAtual = async () => {

            let userId = "";

            const userString = window?.sessionStorage?.getItem("usuario");

            if (userString) {
                const userParsed = JSON.parse(userString);
                userId = userParsed.usrcodigo
            }

            try {
                const response = await api.get('/usuarios/getTemaAtivo/' + userId);

                const data = response.data[0];

                setPacoteAtual(data.tmanome);
            } catch (error) {
                console.error('Erro ao buscar pacote atual:', error);
            }
        };

        fetchPacoteAtual();
    }, []);

    function resetAll() {
        loadDots();
        setPlayerOneChipsAvailables(9);
        setPlayerTwoChipsAvailables(9);
        setEatTime(false);
        setLevels(1);
        setCurrentDotClicked(undefined);
        setPlayerWin(undefined);
        setPlayerTurn("");
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

        if (playerTurn == firstPlayer?.id) {
            setPlayerTurn(secondPlayer?.id ?? "");
            return secondPlayer?.id
        }
        else {
            setPlayerTurn(firstPlayer?.id ?? "");
            return firstPlayer?.id ?? "";
        }

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

    function blinkDotsToEat(player: string, currentDots: DotType[]): DotType[] {
        const gamePoints = new GamePoints();

        const playerEnemy = player == firstPlayer?.id ? secondPlayer?.id : firstPlayer?.id;

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

    function blinkAllEnemyDots(player: string, currentDots: DotType[]): DotType[] {

        const playerEnemy = player == firstPlayer?.id ? secondPlayer?.id : firstPlayer?.id;

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

        playMoveAudio();

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

        playEatAudio();

        return result;
    }


    function clickInDot(dot_id: string) {
        let currentDots = boardDots;
        let currentEatTime = eatTime;
        let currentPlayerTurn = playerTurn;
        let currentPlayerOneChipsAvailable = playerOneChipsAvailables;
        let currentPlayerTwoChipsAvailable = playerTwoChipsAvailables;

        console.log("CONNECTION ID", connection?.connectionId)

        if (connection?.connectionId != playerTurn) {
            playBlockAudio();
            return;
        }

        sendMessage({
            boardDots: currentDots,
            awaitTurn: false,
            canStart: true,
            eatTime: false,
            gameOver: false,
            playerOneChipsAvailables: currentPlayerOneChipsAvailable,
            playerTwoChipsAvailables: currentPlayerTwoChipsAvailable,
            playerTurn: currentPlayerTurn,
            playerWin: undefined
        });

        const dotClicked = getDot(dot_id, currentDots);
        const gamePoints = new GamePoints();


        if (currentEatTime && (gamePoints.hasPlayerEnemyDotsToEat(currentEatTime, currentDots, currentPlayerTurn, firstPlayer as Player, secondPlayer as Player) === false)) {
            currentEatTime = false;
        }


        if (GameRules.canEat(currentEatTime, currentPlayerTurn, dotClicked)) {

            currentDots = eatDot(dotClicked, currentDots);
            currentDots = resetBlink(currentDots);

            sendMessage({
                boardDots: currentDots,
                awaitTurn: false,
                canStart: true,
                eatTime: currentEatTime,
                gameOver: false,
                playerOneChipsAvailables: currentPlayerOneChipsAvailable,
                playerTwoChipsAvailables: currentPlayerTwoChipsAvailable,
                playerTurn: currentPlayerTurn,
                playerWin: undefined
            });

            if (level == 2 && gamePoints.gameOver(currentPlayerTurn, currentDots, firstPlayer as Player, secondPlayer as Player)) {

                console.log("CONNECTION", connection?.connectionId)
                setPlayerWin(connection?.connectionId);
                setGameOver(true);

                playWinAudio();

                sendMessage({
                    boardDots: currentDots,
                    awaitTurn: false,
                    canStart: true,
                    eatTime: currentEatTime,
                    gameOver: true,
                    playerOneChipsAvailables: currentPlayerOneChipsAvailable,
                    playerTwoChipsAvailables: currentPlayerTwoChipsAvailable,
                    playerTurn: currentPlayerTurn,
                    playerWin: connection?.connectionId,
                });

                // resetAll();

                return;
            }

            setEatTime(false);

            currentPlayerTurn = changeTurn() ?? "";

            sendMessage({
                boardDots: currentDots,
                awaitTurn: false,
                canStart: true,
                eatTime: currentEatTime,
                gameOver: true,
                playerOneChipsAvailables: currentPlayerOneChipsAvailable,
                playerTwoChipsAvailables: currentPlayerTwoChipsAvailable,
                playerTurn: currentPlayerTurn,
                playerWin: undefined
            });

            return;
        }



        if (GameRules.canChangeToLevelTwo(currentPlayerOneChipsAvailable, currentPlayerTwoChipsAvailable, level))
            setLevels(2);

        if (level === 2) {

            if (GameRules.canBlink(dotClicked, currentPlayerTurn)) {

                currentDots = resetBlink(currentDots);
                currentDots = blinkNeighbourhoods(dotClicked, currentDots);

                setCurrentDotClicked(dot_id);

                sendMessage({
                    boardDots: currentDots,
                    awaitTurn: false,
                    canStart: true,
                    eatTime: currentEatTime,
                    gameOver: true,
                    playerOneChipsAvailables: playerOneChipsAvailables,
                    playerTwoChipsAvailables: playerTwoChipsAvailables,
                    playerTurn: currentPlayerTurn,
                    playerWin: undefined
                });

                setEatTime(currentEatTime);


                return;
            }

            if (GameRules.canMove(dotClicked, level)) {

                currentDots = moveDot(dotClicked, currentDots);

                if (gamePoints.rowCombined(dotClicked, currentPlayerTurn, currentDots, getDot)) {
                    currentDots = resetBlink(currentDots);
                    currentDots = blinkDotsToEat(currentPlayerTurn, currentDots);

                    setEatTime(true);

                    sendMessage({
                        boardDots: currentDots,
                        awaitTurn: false,
                        canStart: true,
                        eatTime: true,
                        gameOver: true,
                        playerOneChipsAvailables: playerOneChipsAvailables,
                        playerTwoChipsAvailables: playerTwoChipsAvailables,
                        playerTurn: currentPlayerTurn,
                        playerWin: undefined
                    });

                    return;
                }


                currentDots = resetBlink(currentDots);
                currentPlayerTurn = changeTurn() ?? "";

                sendMessage({
                    boardDots: currentDots,
                    awaitTurn: false,
                    canStart: true,
                    eatTime: false,
                    gameOver: true,
                    playerOneChipsAvailables: playerOneChipsAvailables,
                    playerTwoChipsAvailables: playerTwoChipsAvailables,
                    playerTurn: currentPlayerTurn,
                    playerWin: undefined
                });

                setEatTime(false);


                return;

            }
        }

        //LVL 1

        if (GameRules.canPutDot(playerTurn, dotClicked, currentPlayerOneChipsAvailable, currentPlayerTwoChipsAvailable, currentEatTime, firstPlayer as Player, secondPlayer as Player) === false) {
            playBlockAudio();
            return;
        }

        const isPlayerOne = currentPlayerTurn == firstPlayer?.id;

        if (isPlayerOne) {
            currentPlayerOneChipsAvailable = currentPlayerOneChipsAvailable - 1;
            setPlayerOneChipsAvailables(currentPlayerOneChipsAvailable - 1);
        }
        else {
            currentPlayerTwoChipsAvailable = currentPlayerTwoChipsAvailable - 1;
            setPlayerTwoChipsAvailables(currentPlayerTwoChipsAvailable - 1);
        }

        currentDots = currentDots.map(dot => {
            if (dot.id === dot_id) {
                return { ...dot, has_piece: true, player: currentPlayerTurn };
            } else {
                return dot;
            }
        });

        playClickAudio();

        if (gamePoints.rowCombined(dotClicked, currentPlayerTurn, currentDots, getDot)) {

            currentDots = blinkDotsToEat(currentPlayerTurn, currentDots);

            setEatTime(true);


            sendMessage({
                boardDots: currentDots,
                awaitTurn: false,
                canStart: true,
                eatTime: true,
                gameOver: true,
                playerOneChipsAvailables: currentPlayerOneChipsAvailable,
                playerTwoChipsAvailables: currentPlayerTwoChipsAvailable,
                playerTurn: currentPlayerTurn,
                playerWin: undefined
            });

            return;
        }

        currentPlayerTurn = changeTurn() ?? "";

        sendMessage({
            boardDots: currentDots,
            awaitTurn: false,
            canStart: true,
            eatTime: currentEatTime,
            gameOver: true,
            playerOneChipsAvailables: currentPlayerOneChipsAvailable,
            playerTwoChipsAvailables: currentPlayerTwoChipsAvailable,
            playerTurn: currentPlayerTurn,
            playerWin: undefined
        });
    }

    useEffect(() => {
        loadDots();
    }, []);

    return (
        <BoardContext.Provider
            value={
                {
                    pacoteAtual,
                    playerOneChipsAvailables,
                    playerTwoChipsAvailables,
                    boardDots,
                    playerTurn,
                    gameOver,
                    playerWin,
                    clickInDot,
                }}>
            {children}
        </BoardContext.Provider>
    );
}