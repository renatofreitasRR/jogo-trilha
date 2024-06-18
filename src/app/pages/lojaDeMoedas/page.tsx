"use client";
import Link from 'next/link';
import styles from '../../styles.module.css';
import { useState } from 'react';
import Image from 'next/image';

const Loja: React.FC = () => {

    const [currentIcon, setCurrentIcon] = useState(0);

    const icons = [
        '/assets/Icon1.png',
        '/assets/Icon2.png',
        '/assets/Icon3.png',
        '/assets/Icon4.png'
    ];

    const titles = [
        'JETSONS',
        'FLINTSTONES',
        'SCOOBY-DOO',
        'PAC-MAN'
    ];

    const handleIconChange = () => {
        setCurrentIcon((prevIcon) => (prevIcon + 1) % icons.length);
    };

    const handleIconChangeBack = () => {
        setCurrentIcon((prevIcon) => (prevIcon - 1 + icons.length) % icons.length);
    };

    return (
        <>
            <Link href="/">
                <div id={styles["Logo"]}> </div>
            </Link>

            <div id={styles["Conteiner"]}>
                <div id={styles["Maquina"]}>
                    <div id={styles["Tela"]}>

                        <Link href='../../' id={styles["Voltar"]}>
                            <div id={styles["BotaoVoltar"]}></div>
                        </Link>


                        <Link href={'../../pages/lojaDeMoedas'}>
                        <div id={styles["SaldoImg"]}>
                            <div id={styles["SaldoTxt"]}>
                                GetSaldo
                            </div>
                        </div>
                        </Link>

                        
                        <div id={styles["TituloTema"]}>
                            {titles[currentIcon]}
                        </div>
                        <div id={styles["AreaPacotes"]}>
                            <div 
                                id={styles["SetaMudaPacoteVolta"]}
                                onClick={handleIconChangeBack}
                            ></div>
                            <div className={styles.Pacote}></div>
                            <div 
                                id={styles["IconeLoja"]}
                            >
                                <Image 
                                    src={icons[currentIcon]} 
                                    alt={`Icone ${currentIcon + 1}`}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <div 
                                id={styles["SetaMudaPacote"]}
                                onClick={handleIconChange}
                            ></div>

                            <Link href={`../../pages/compra?icon=${currentIcon}`}>
                                <div id={styles["BotaoComprarLoja"]}></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Loja;
