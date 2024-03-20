'use client'
import { useContext } from "react";
import Chip from "./components/chip";
import Layer from "./components/layer";
import Separator from "./components/separator";
import { BoardContext, BoardProvider } from "./contexts/boardContext";
import styles from './page.module.css';
import ChipAvailable from "./components/chipaside";
import { PlayerTurn } from "./components/playerturn";

export default function Board() {

    return (
        <BoardProvider>
            <PlayerTurn />
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
        </BoardProvider>

    );
}