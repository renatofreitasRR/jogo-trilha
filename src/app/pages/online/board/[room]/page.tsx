'use client'
import Layer from "../components/Layer";
import Separator from "../components/Separator";
import { BoardProvider } from "../contexts/boardContext";
import styles from './page.module.css';
import ChipAvailable from "../components/ChipAside";
import { PlayerTurn } from "../components/PlayerTurn";
import { WebSocketProvider } from "../contexts/webSocketContext";
import { useParams } from 'next/navigation';
import { AwaitModal } from "../components/AwaitModal";
import { ChakraProvider } from '@chakra-ui/react'
import { getLocalItem } from "@/app/utils/sessionStorage";
import { WinModal } from "../components/WinModal";
import { LoseModal } from "../components/LoseModal";

export default function BoardOnline() {

    const params = useParams();
    const { room } = params;

    return (
        <ChakraProvider>

            <WebSocketProvider>
                <BoardProvider>
                    <PlayerTurn />
                    <h1 className={styles.user}>Usuário: {getLocalItem("nome")}</h1>
                    <h1>Room {room}</h1>
                    <div className={styles.page_content}>
                        <div className={styles.page_division}>
                            <ChipAvailable player={1} />
                            <main className={styles.board_container}>
                                <Layer
                                    layer={1}
                                />
                                <Layer
                                    layer={2}
                                />
                                <Layer
                                    layer={3}
                                />
                                <Separator
                                    position='left'
                                />
                                <Separator
                                    position='right'
                                />
                                <Separator
                                    position='top'
                                />
                                <Separator
                                    position='bottom'
                                />
                            </main>
                            <ChipAvailable player={2} />
                        </div>
                        <audio
                            muted
                            src='/sounds/play.mp3'
                            controls
                        />
                    </div>
                    <AwaitModal />
                    <WinModal />
                    <LoseModal />
                </BoardProvider>
            </WebSocketProvider>
        </ChakraProvider>
    );
}