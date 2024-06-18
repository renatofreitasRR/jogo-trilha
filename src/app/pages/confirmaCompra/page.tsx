"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import styles from '../../styles.module.css';

const ConfirmaCompraContent: React.FC = () => {
    const [selectedTitle, setSelectedTitle] = useState('Titulo');
    const searchParams = useSearchParams();

    const titles = [
        'JETSONS',
        'FLINTSTONES',
        'SCOOBY-DOO',
        'PAC-MAN'
    ];

    useEffect(() => {
        const icon = searchParams.get('icon');
        if (icon !== null && Number(icon) < titles.length) {
            setSelectedTitle(titles[Number(icon)]);
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
                        <div id={styles["ConfirmaCompra"]}>
                            <div id={styles["AreaTituloConfirmacao"]}>
                                <p>{selectedTitle}</p>
                            </div>
                            <div id={styles["AreaConfirmacao"]}>
                                <div id={styles["AreaValorSaldo"]}>GETSALDO</div>
                                -200 <br />
                                ---- <br />
                                <div id={styles["AreaSaldoPosCompra"]}>FIMSALDO</div>
                            </div>
                        </div>
                        <Link href='../../pages/perfil'>
                            <div id={styles["BotaoComprarConfirma"]}></div>
                        </Link>
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
