"use client";
import Link from 'next/link';
import styles from '../../styles.module.css';
import { useState } from 'react';

const lojaDeMoedas: React.FC = () => {

    const [quantity, setQuantity] = useState(1); // Estado para armazenar a quantidade

   
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Number(event.target.value)); // Garante que o valor não seja menor que 1
        setQuantity(value);
    };

    // Função para formatar o valor em reais
    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const SaldoASerAdicionado = 500 * quantity; // AQUI RECEBE O VALOR A SER MANDADO PRO BANCO

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

                        <div id={styles["AreaPacotes"]}>
                            <div className={styles.PacoteMoedas}>
                                <input 
                                    type="number" 
                                    id={styles["AlteraQtdPacotes"]} 
                                    value={quantity} 
                                    onChange={handleQuantityChange} 
                                    min="1"
                                />
                                <div id={styles["AlteraMoedasPacotes"]}> {SaldoASerAdicionado}x </div>
                                <div id={styles["AlteraRealPacotes"]}> {formatCurrency(10 * quantity)} </div>
                            </div>
                            
                            <Link href={`../../pages/perfil`}>
                                <div id={styles["BotaoComprarLojaMoedas"]}></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default lojaDeMoedas;
