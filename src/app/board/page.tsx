'use client'
import Layer from "./components/layer";
import Separator from "./components/separator";
import { BoardProvider } from "./context/boardContext";

export default function Board() {
    return (
        <BoardProvider>
            <main style={
                {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100vw',
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                    position: 'relative'
                }
            }>
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
        </BoardProvider>

    );
}