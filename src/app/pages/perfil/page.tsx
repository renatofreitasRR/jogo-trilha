"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../../styles.module.css';
import SelecaoPacote from './components/selecaoPacote';
import PerfilFrame from './components/perfilFrame';
import { api } from '@/app/services/api';

const Perfil: React.FC = () => {
    var [pacotesDisponiveis, setPacotesDisponiveis] = useState(["jetsons", "flinstones"]); //Mockado
    var [pacoteAtual, setPacoteAtual] = useState("jetsons"); //Mockado

    useEffect(() => {
        const fetchPacotesDisponiveis = async () => {
            try {
                const response = await api.get('/usuario-tema/pacotesDisponiveis'); //ToDo: Substituir pelo endpoint da API que retorna os Pacotes Disponíveis do usuário
                setPacotesDisponiveis(response.data);
            } catch (error) {
                console.error('Erro ao buscar pacotes:', error);
            }
        };

        const fetchPacoteAtual = async () => {
            try {
                const response = await api.get('/api/pacoteAtual'); //ToDo: Substituir pelo endpoint da API que retorna o Pacote Ativo do usuário
                setPacoteAtual(response.data);
            } catch (error) {
                console.error('Erro ao buscar pacote atual:', error);
            }
        };

        fetchPacotesDisponiveis();
        fetchPacoteAtual()
    }, []);


    return (
        <>
            <Link href="/">
                <div id={styles["Logo"]}> </div>
            </Link>

            <div id={styles["Conteiner"]}>
                <div id={styles["Maquina"]}>
                    <div id={styles["Tela"]}>

                        <Link href='../../' id={styles["Voltar"]}>
                            <div id={styles["BotaoVoltar"]}>   </div>
                        </Link>

                        <div id={styles["SaldoImg"]}>
                            <div id={styles["SaldoTxt"]}>
                                {/*AQUI VAI A FUNÇÃO QUE DEVE RETORNAR O SALDO NA CONTA DO USUÁRIO*/}
                                {/*AQUI TAMBÉM PRECISA LINKAR COM A TELA DE SALDO, PRA UM HREF */}
                                9999
                            </div>
                        </div>

                        <div id={styles["IconePerfilFrame"]}>
                            <PerfilFrame url={'https://img.lovepik.com/png/20231028/Cartoon-cute-pixel-style-art-dog-Pixel-puppy-Yellow-dog_383168_wh860.png'}>
                            </PerfilFrame>
                        </div>

                        <div id={styles["TextoSelecionePacote"]}>
                            Selecione o Pacote Ativo
                        </div>

                        <div id={styles["TextoPacotesDisponiveis"]}>
                            {pacotesDisponiveis.length ? <div>
                                {pacotesDisponiveis.map(function (pacote, idx) {
                                    return <SelecaoPacote ativo={pacote.toUpperCase() === pacoteAtual.toUpperCase()}
                                        nome={pacote.toUpperCase()} idx={idx}
                                        onClick={() => {
                                            setPacoteAtual(pacote);
                                            selecionarPacote(pacote)
                                        }} />
                                })}
                            </div> : "Nenhum Pacote Disponível :("}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Perfil;

function selecionarPacote(pacote: string) {
    //ToDo: Implementar salvar no banco o pacote atual
    //ToDo: Implementar aplicar o pacote selecionado
}
