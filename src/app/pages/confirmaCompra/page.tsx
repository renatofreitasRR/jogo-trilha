"use client";
import { api } from '@/app/services/api';
import Link from 'next/link';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../../styles.module.css';
import { useToast } from '@chakra-ui/react';

const ConfirmaCompraContent: React.FC = () => {
    var [moedas, setMoedas] = useState(0);
    const [userId, setUserId] = useState("");
    const [selectedTitle, setSelectedTitle] = useState('Titulo');
    const searchParams = useSearchParams();

    const titles = [
        'JETSONS',
        'FLINTSTONES',
        'SCOOBY-DOO',
        'PAC-MAN'
    ];

    const toast = useToast();

    useEffect(() => {
        const icon = searchParams.get('icon');
        if (icon !== null && Number(icon) < titles.length) {
            setSelectedTitle(titles[Number(icon)]);
        }

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
    }, [searchParams]);

    async function comprarTemaOnClick(moedas: number, canBuy: boolean) {
        if (canBuy) {
            setMoedas(moedas - 200);
            subtractMoedas(moedas, userId);
        } else {
            toast({
                title: "Compra Não Realizada",
                description: "Moedas insuficientes para compra!",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    }

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
                        <Link href={'../../pages/lojaDeMoedas'}>
                            <div id={styles["SaldoImg"]}>
                                <div id={styles["SaldoTxt"]}>
                                    {moedas}
                                </div>
                            </div>
                        </Link>
                        <div id={styles["ConfirmaCompra"]}>
                            <div id={styles["AreaTituloConfirmacao"]}>
                                <p>{selectedTitle}</p>
                            </div>
                            <div id={styles["AreaConfirmacao"]}>
                                <div id={styles["AreaValorSaldo"]}>{moedas}</div>
                                -200 <br />
                                ---- <br />
                                <div id={styles["AreaSaldoPosCompra"]}>{moedas - 200}</div>
                            </div>
                        </div>
                        <button onClick={() => comprarTemaOnClick(moedas, true)}>
                            <div id={styles["BotaoComprarConfirma"]}></div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const ConfirmaCompra: React.FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <ConfirmaCompraContent />
    </Suspense>
);

export default ConfirmaCompra;

async function subtractMoedas(moedas: number, userId: string) {
    await api.post(('/usuarios/subtractcoins/' + userId), {
        "moedas": moedas
    });
}