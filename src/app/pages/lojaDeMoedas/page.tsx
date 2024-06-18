"use client";
import { api } from '@/app/services/api';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../../styles.module.css';

const lojaDeMoedas: React.FC = () => {
    var [moedas, setMoedas] = useState(0);
    const [quantity, setQuantity] = useState(1); // Estado para armazenar a quantidade
    const [userId, setUserId] = useState("");

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
   
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Number(event.target.value)); // Garante que o valor não seja menor que 1
        setQuantity(value);
    };

    // Função para formatar o valor em reais
    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const saldoASerAdicionado = 500 * quantity; // AQUI RECEBE O VALOR A SER MANDADO PRO BANCO

    async function comprarMoedasOnClick(newMoedas: number) {
        setMoedas(moedas + newMoedas);
        addMoedas(newMoedas, userId);
    }

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
                                {moedas}
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
                                <div id={styles["AlteraMoedasPacotes"]}> {saldoASerAdicionado}x </div>
                                <div id={styles["AlteraRealPacotes"]}> {formatCurrency(10 * quantity)} </div>
                            </div>

                            <button onClick={() => comprarMoedasOnClick(saldoASerAdicionado)}>
                                <div id={styles["BotaoComprarLojaMoedas"]}> </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default lojaDeMoedas;

async function addMoedas(moedas: number, userId: string) {
    await api.post(('/usuarios/addcoins/' + userId), {
        "moedas": moedas
    });
}