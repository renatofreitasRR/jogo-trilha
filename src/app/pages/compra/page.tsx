"use client";
import { api } from '@/app/services/api';
import Link from 'next/link';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../../styles.module.css';

const CompraContent: React.FC = () => {
    var [moedas, setMoedas] = useState(0);
    const [userId, setUserId] = useState("");
    const [selectedTitle, setSelectedTitle] = useState('Titulo');
    const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
    const [selectedIcon, setSelectedIcon] = useState<number>(0);
    const searchParams = useSearchParams();

    useEffect(() => {
        function fetchUserId() {
            const userString = window?.sessionStorage?.getItem("usuario");

            if (userString) {
                const userParsed = JSON.parse(userString);
                setUserId(userParsed.usrcodigo);
            }
        };

        fetchUserId();

        const fetchMoedas = async () => {
            try {
                const response = await api.get('/usuarios/getcoins/' + userId);

                const data = response.data.user;

                setMoedas(data.usrmoedas);
            } catch (error) {
                console.error('Erro ao buscar moedas:', error);
            }
        };

        fetchMoedas();
    }, []);

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
                                {moedas}
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

const Compra: React.FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <CompraContent />
    </Suspense>
);

export default Compra;
