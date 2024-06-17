"use client";
import Link from 'next/link';
import styles from '../../styles.module.css';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

const ConfirmaCompra: React.FC = () => {
    const [selectedTitle, setSelectedTitle] = useState('Titulo');
    const searchParams = useSearchParams();

    // const iconParam = searchParams.get('icon'); // RETORNA QUAL O ICON SELECIONADO NA LOJA
    //1 = JETSONS, 2= FLINSTONES, 3= SCOOBY-DOO, 4= PAC-MAN

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
        <Suspense>
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
                                {/* AQUI DEVE SER IMPLEMENTADA A FUNÇÃO QUE RECEBE QUANTO O USUARIO TEM NA CONTA */}
                                9999
                            </div>
                        </div>

                        <div id={styles["ConfirmaCompra"]}>
                            <div id={styles["AreaTituloConfirmacao"]}>
                                <p>{selectedTitle}</p>
                            </div>
                            <div id={styles["AreaConfirmacao"]}>

                                <div id={styles["AreaValorSaldo"]}>GETSALDO </div>
                                {/* AQUI DEVE SER IMPLEMENTADA A FUNÇÃO QUE RECEBE QUANTO O USUARIO TEM NA CONTA */}
                                -200 <br />
                                ---- <br />
                                <div id={styles["AreaSaldoPosCompra"]}>FIMSALDO</div>

                            </div>
                        </div>

                        <Link href='../../pages/perfil'>
                            <div id={styles["BotaoComprarConfirma"]}></div>
                            {/* AQUI DEVE SER IMPLEMENTADA A FUNÇÃO QUE ENVIA PARA O BD QUAL PACOTE FOI COMPRADO
                                A INFORMAÇÃO É RETORNADA PELO searchParams.get('icon') 
                            */}
                        </Link>

                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default ConfirmaCompra;
