"use client";
import styles from '../../styles.module.css';

const Loja: React.FC = () => {


    return (
        <>
            
            {/*ARRUMAR O HREF AQUI, TEM QUE VOLTAR A PAGINA PRINCIPAL*/}
            <a href="../../page.tsx">
                <div id={styles["Logo"]}> </div>
            </a> 

            <div id={styles["Conteiner"]}>
                <div id={styles["Maquina"]}>
                    <div id={styles["Tela"]}>

                        {/*ARRUMAR O HREF AQUI, TEM QUE VOLTAR A PAGINA PRINCIPAL*/}

                        <a href='../../page.tsx' id={styles["Voltar"]}>
                            <div id={styles["BotaoVoltar"]}>   </div>
                        </a>
                        
                        <div id={styles["SaldoImg"]}>
                            <div id={styles["SaldoTxt"]}>
                                {/*AQUI VAI A FUNÇÃO QUE DEVE RETORNAR O SALDO NA CONTA DO USUÁRIO*/}
                                {/*AQUI TAMBÉM PRECISA LINKAR COM A TELA DE SALDO, PRA UM HREF */}
                                9999 
                            </div>
                        </div>
                        <div id={styles["AreaPacotes"]}>
                            <a href="../../pages/jetsonsCompra">
                                <div className={styles.Pacote} id={styles["Jetsons"]}> </div>
                            </a>

                            <a href="../../pages/flinstonesCompra">
                                <div className={styles.Pacote} id={styles["Flinstones"]}> </div>
                            </a>
                        </div>


                    </div>
                </div>
            </div>

        </>
    );
};

export default Loja;

