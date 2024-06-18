'use client'
import styles from './page.module.css';
import { useParams } from 'next/navigation';
import { ChakraProvider } from '@chakra-ui/react'
import { getLocalItem } from "@/app/utils/sessionStorage";
import ChipAvailable from '../ChipAside';
import Layer from '../Layer';
import Separator from '../Separator';
import { useState, useContext } from 'react';
import { BoardContext } from '../../contexts/boardContext';

export default function BoardOnlineComponent() {

    const params = useParams();
    const { room } = params;

    var [pacotesDisponiveis, setPacotesDisponiveis] = useState(["jetsons", "flinstones", "scooby doo", "pacman"]); //Mockado
    const { pacoteAtual } = useContext(BoardContext);


    const iconMapping: any = {
        jetsons: '/assets/BackgroundView1.png',
        flinstones: '/assets/BackgroundView2.png',
        'scooby doo': '/assets/BackgroundView3.png',
        pacman: '/assets/BackgroundView4.png'
    };

    const soundsMapping: any = {
        jetsons: '/sounds/jetsons.mp3',
        flinstones: '/sounds/flintstones.mp3',
        'scooby doo': '/sounds/scoobydoo.mp3',
        pacman: '/sounds/pacman.mp3'
    };

    return (
        <div
            className={styles.page_content}
            style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url(${pacoteAtual ? iconMapping[pacoteAtual] : '/assets/background/1311265.png'})`
            }}
        >
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
                src={`${pacoteAtual ? soundsMapping[pacoteAtual] : '/sounds/play.mp3'}`}
                controls
            />
        </div>
    );
}