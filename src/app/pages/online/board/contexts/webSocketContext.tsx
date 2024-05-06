"use client"

import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { DotType } from "../interfaces/dotType";
import dots_json from "../../../../../../data/data.json";
import { useParams } from "next/navigation";
import { getLocalItem } from "@/app/utils/localStorage";
import { Player } from "../interfaces/player";


interface WebSocketContextProps {
    canStart: boolean;
    playerTurn: string;
    sendMessage: (obj: any) => Promise<void>;
    firstPlayer: Player | undefined;
    secondPlayer: Player | undefined;
    setPlayerTurn: Dispatch<SetStateAction<string>>
    connection: HubConnection | null;
    boardDots: DotType[];
    loadDots: () => void;
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
    const params = useParams();
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
        closeConnection();

        console.log("JOINING ROOMM");

        const connect = new HubConnectionBuilder()
            .withUrl("http://localhost:7194/game")
            .configureLogging(LogLevel.Information)
            .build();

        connect.on("ReceivedMessage", (dots: DotType[]) => {
            setBoardDots(dots);

        });

        connect.on("HasOtherPlayerInRoom", (result: boolean) => {
            console.log("HasOtherPlayerInRoom", result);

            if (result) {
                const connection: Player = {
                    connectionId: connect.connectionId,
                    id: 2,
                    name: `${getLocalItem("nome")}-${connect.connectionId}`
                }

                console.log("PLAYER TWO", connection);

                setFirstPlayer(connection)
                setCanStart(true);
            }
            else {

                const connection: Player = {
                    connectionId: connect.connectionId,
                    id: 1,
                    name: `${getLocalItem("nome")}-${connect.connectionId}`
                }

                console.log("PLAYER ONE", connection);

                setPlayerTurn(connect.connectionId ?? "");
                setSecondPlayer(connection)
            }
        });

        connect.onclose(e => {
            setConnection(null);
        });

        await connect.start();
        await connect.invoke("JoinRoom", { room });
        setConnection(connect);
    }

    useEffect(() => {
        loadDots();
        joinRoom();
    }, []);

    const sendMessage = async (dots: any) => {
        if (connection) {
            console.log("CONNECTION ID", connection.connectionId);
            await connection.send("SendMessage", dots);
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
                canStart,
                sendMessage,
                connection,
                boardDots,
                setPlayerTurn,
                playerTurn,
                firstPlayer,
                secondPlayer,
                loadDots
            }}>
        {children}
    </WebSocketContext.Provider>
    )
}
