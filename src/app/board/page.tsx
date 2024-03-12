'use client'
import Chip from "./components/chip";
import Layer from "./components/layer";
import Separator from "./components/separator";
import { BoardProvider } from "./context/boardContext";
import styles from './page.module.css';

export default function Board() {
    return (
        <BoardProvider>
            <div className={styles.page_division}>
                <aside className={styles.chips_container}>
                    <h2>Jogador Nº1</h2>
                    <Chip />
                    <Chip />
                    <Chip />
                    <Chip />
                    <Chip />
                    <Chip />
                    <Chip />
                    <Chip />
                    <Chip />
                </aside>
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
                <aside className={styles.chips_container}>
                    <h2>Jogador Nº2</h2>
                    <Chip />
                    <Chip />
                    <Chip />
                    <Chip />
                    <Chip />
                    <Chip />
                    <Chip />
                    <Chip />
                    <Chip />
                </aside>
            </div>
        </BoardProvider>

    );
}