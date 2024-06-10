"use client"

import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { DotType } from "../interfaces/dotType";
import dots_json from "../../../../../../data/data.json";
import { useParams, useRouter } from "next/navigation";
import { getLocalItem } from "@/app/utils/sessionStorage";
import { Player } from "../interfaces/player";


interface BoardStates {
    playerWin: string | undefined;
    boardDots: DotType[];
    playerOneChipsAvailables: number;
    playerTwoChipsAvailables: number;
    gameOver: boolean;
    playerTurn: string;
    canStart: boolean;
    awaitTurn: boolean;
    eatTime: boolean;
}

interface WebSocketContextProps {
    canStart: boolean;
    playerTurn: string;
    sendMessage: (states: BoardStates) => Promise<void>;
    firstPlayer: Player | undefined;
    secondPlayer: Player | undefined;
    setPlayerTurn: Dispatch<SetStateAction<string>>
    connection: HubConnection | null;
    awaitTurn: boolean;
    boardDots: DotType[];
    loadDots: () => void;
    currentDotClicked: string | undefined;
    setCurrentDotClicked: Dispatch<SetStateAction<string | undefined>>;
    level: 1 | 2 | 3;
    setLevels: Dispatch<SetStateAction<1 | 2 | 3>>;
    playerOneChipsAvailables: number;
    setPlayerOneChipsAvailables: Dispatch<SetStateAction<number>>;
    playerTwoChipsAvailables: number;
    setPlayerTwoChipsAvailables: Dispatch<SetStateAction<number>>;
    eatTime: boolean;
    setEatTime: Dispatch<SetStateAction<boolean>>;
    gameOver: boolean;
    setGameOver: Dispatch<SetStateAction<boolean>>;
    playerWin: string | undefined;
    setPlayerWin: Dispatch<SetStateAction<string | undefined>>;
}

export const WebSocketContext = createContext({} as WebSocketContextProps);

interface WebSocketProviderProps {
    children: ReactNode;
}


export function WebSocketProvider({ children }: WebSocketProviderProps) {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [boardDots, setBoardDots] = useState<DotType[]>([]);
    const [playerTurn, setPlayerTurn] = useState<string>("");
    const [firstPlayer, setFirstPlayer] = useState<Player | undefined>(undefined);
    const [secondPlayer, setSecondPlayer] = useState<Player | undefined>(undefined);
    const [canStart, setCanStart] = useState(false);
    const [awaitTurn, setAwaitTurn] = useState(false);
    const [playerWin, setPlayerWin] = useState<string | undefined>(undefined);
    const [currentDotClicked, setCurrentDotClicked] = useState<string | undefined>(undefined);
    const [level, setLevels] = useState<1 | 2 | 3>(1);
    const [playerOneChipsAvailables, setPlayerOneChipsAvailables] = useState(9);
    const [playerTwoChipsAvailables, setPlayerTwoChipsAvailables] = useState(9);
    const [eatTime, setEatTime] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const params = useParams();
    const router = useRouter();
    const { room } = params;

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

        const arrays_joined: DotType[] = dots_in_layer_1_array
            .concat(dots_in_layer_2_array)
            .concat(dots_in_layer_3_array)

        setBoardDots(arrays_joined);
    }

    async function joinRoom() {
        try {
            closeConnection();

            const connect = new HubConnectionBuilder()
                .withUrl(`${process.env.WEBSOCKET_ROUTE}/game`)
                .configureLogging(LogLevel.Information)
                .build();

            connect.on("ReceivedMessage", (states: BoardStates) => {
                setAwaitTurn(false);

                setBoardDots(states.boardDots);
                setPlayerTurn(states.playerTurn);
                setAwaitTurn(states.awaitTurn);
                setCanStart(states.canStart);
                setEatTime(states.eatTime);
                setPlayerOneChipsAvailables(states.playerOneChipsAvailables);
                setPlayerTwoChipsAvailables(states.playerTwoChipsAvailables);
                setGameOver(states.gameOver);
                setPlayerWin(states.playerWin);

            });

            connect.on("Disconnect", (value: boolean) => {
                // router.push('/pages/online/bypass');
            });

            connect.on("Players", (result: Player[]) => {
                if (result.length > 1) {

                    const one = result[0];
                    const two = result[1];

                    console.log("Players", result);

                    setFirstPlayer(one);
                    setSecondPlayer(two);

                    setPlayerTurn(result[0].id ?? "")

                    // if (connect?.connectionId == one.id)
                    // setAwaitTurn(false);

                    setCanStart(true);
                }
            });

            connect.onclose(e => {
                console.log("CLOSE");
                setConnection(null);
            });

            const userNickName = getLocalItem("nome");

            await connect.start();
            await connect.invoke("JoinRoom", { room, userNickName });
            setConnection(connect);
        }
        catch (err: any) {
            console.log("WEB SOCKET ERROR", err)
        }

    }

    useEffect(() => {
        loadDots();
        joinRoom();
    }, []);

    const sendMessage = async (states: BoardStates) => {
        if (connection) {
            await connection.send("SendMessage", states);
        }
        else {
            "BOLOLO HAHA"
        }
    };

    async function closeConnection() {
        try {
            await connection?.stop();
        }
        catch (e: any) {
            console.log('Error on try Close Connection ', e);
        }
    }


    return (<WebSocketContext.Provider
        value={
            {
                setPlayerTurn,
                loadDots,
                sendMessage,
                setPlayerWin,
                setCurrentDotClicked,
                setEatTime,
                setGameOver,
                setLevels,
                setPlayerOneChipsAvailables,
                setPlayerTwoChipsAvailables,
                awaitTurn,
                canStart,
                connection,
                boardDots,
                playerTurn,
                firstPlayer,
                secondPlayer,
                currentDotClicked,
                eatTime,
                gameOver,
                level,
                playerOneChipsAvailables,
                playerTwoChipsAvailables,
                playerWin,

            }}>
        {children}
    </WebSocketContext.Provider>
    )
}
