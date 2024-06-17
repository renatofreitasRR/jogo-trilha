"use client";
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import styles from '../../styles.module.css';
import { useSearchParams } from 'next/navigation';

const Compra: React.FC = () => {
    const [selectedTitle, setSelectedTitle] = useState('Titulo');
    const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
    const [selectedIcon, setSelectedIcon] = useState<number>(0);
    const searchParams = useSearchParams();

    const titles = [
        'JETSONS',
        'FLINTSTONES',
        'SCOOBY-DOO',
        'PAC-MAN'
    ];

    const backgrounds = [
        '/assets/BackgroundView1.png',
        '/assets/BackgroundView2.png',
        '/assets/BackgroundView3.png',
        '/assets/BackgroundView4.png'
    ];

    const icons = [
        '/assets/Icon1.png',
        '/assets/Icon2.png',
        '/assets/Icon3.png',
        '/assets/Icon4.png'
    ];

    const pecas = [
        '/assets/PecasView1.png',
        '/assets/PecasView2.png',
        '/assets/PecasView3.png',
        '/assets/PecasView4.png'
    ];

    useEffect(() => {
        const icon = searchParams.get('icon');
        if (icon !== null && Number(icon) < titles.length) {
            const iconIndex = Number(icon);
            setSelectedTitle(titles[iconIndex]);
            setSelectedBackground(backgrounds[iconIndex]);
            setSelectedIcon(iconIndex);
        }
    }, [searchParams]);

    return (
        <>
            <Link href="/">
                <div id={styles["Logo"]}></div>
            </Link>

            <div id={styles["Conteiner"]}>
                <div id={styles["Maquina"]}>
                    <div id={styles["Tela"]}>

                        <Link href='../../pages/loja' id={styles["Voltar"]}>
                            <div id={styles["BotaoVoltar"]}></div>
                        </Link>

                        <div id={styles["SaldoImg"]}>
                            <div id={styles["SaldoTxt"]}>
                                9999
                            </div>
                        </div>

                        <div id={styles["TituloTemaCompra"]}>
                            <p>{selectedTitle}</p>
                        </div>

                        <div id={styles["View"]}>
                            <div id={styles["FundoTema"]} style={{ backgroundImage: `url(${selectedBackground})` }}></div>
                            <div id={styles["IconeTema"]} style={{ backgroundImage: `url(${icons[selectedIcon]})` }}></div>
                            <div id={styles["PecaTema"]} style={{ backgroundImage: `url(${pecas[selectedIcon]})` }}></div>
                        </div>

                        <Link href={`../../pages/confirmaCompra?icon=${selectedIcon}`}>
                            <div id={styles["BotaoComprar"]}></div>
                        </Link>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Compra;
