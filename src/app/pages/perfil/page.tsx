"use client";
import { api } from '@/app/services/api';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../../styles.module.css';
import PerfilFrame from './components/perfilFrame';
import SelecaoPacote from './components/selecaoPacote';

const Perfil: React.FC = () => {
    var [pacotesDisponiveis, setPacotesDisponiveis] = useState(["jetsons", "flinstones", "scooby doo", "pacman"]); //Mockado
    var [pacoteAtual, setPacoteAtual] = useState("");
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

        const fetchPacoteAtual = async () => {
            try {
                const response = await api.get('/usuarios/getTemaAtivo/' + userId);

                const data = response.data.tema;

                setPacoteAtual(data.tmanome);
            } catch (error) {
                console.error('Erro ao buscar pacote atual:', error);
            }
        };

        fetchPacoteAtual();
    }, []);

    async function salvarTudo(pacote: string) {
        setPacoteAtual(pacote);
        await selecionarPacote(pacote, userId);
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
                                        onClick={() => salvarTudo(pacote)} />
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

async function selecionarPacote(nomePacote: string, idUsuario: string) {
    await api.post(`/usuarios/updateTemaAtivo/${idUsuario}`, {
        "nome_tema_ativo": nomePacote
    });
}
